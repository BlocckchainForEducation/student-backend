const readXlsxFile = require("read-excel-file/node");
const { createHash } = require("crypto");
const { protobuf } = require("sawtooth-sdk");
const { createContext, CryptoFactory } = require("sawtooth-sdk/signing");
const { Secp256k1PrivateKey } = require("sawtooth-sdk/signing/secp256k1");
const context = createContext("secp256k1");
// const cbor = require("cbor");

function createSigner(privateKeyHexString) {
  const privKey256k1 = Secp256k1PrivateKey.fromHex(privateKeyHexString);
  const signer = new CryptoFactory(context).newSigner(privKey256k1);
  return signer;
}

async function writeDataToBkc(file, schema, protobuf, privateKey) {
  const records = await parseExcel(file, schema);
  const signer = createSigner(privateKey);
  const signedTxs = signTxs(records);
  const batchListBytes = signBatch(signedTxs);
  return postToValidator(batchListBytes);
}

function parseExcel(file, schema) {
  return readXlsxFile(file, { schema }).then(({ rows, errors }) => {
    if (errors.length !== 0) console.log(errors);
    return rows;
  });
}

function signTxs(records) {
  return records.map((record) => {
    //encode record
    const payloadBytes = cbor.encode(record);
    // create header
    const transactionHeaderBytes = protobuf.TransactionHeader.encode({
      familyName: "intkey",
      familyVersion: "1.0",
      inputs: ["1cf1266e282c41be5e4254d8820772c5518a2c5a8c0c7f7eda19594a7eb539453e1ed7"],
      outputs: ["1cf1266e282c41be5e4254d8820772c5518a2c5a8c0c7f7eda19594a7eb539453e1ed7"],
      signerPublicKey: signer.getPublicKey().asHex(),
      batcherPublicKey: signer.getPublicKey().asHex(),
      dependencies: [],
      payloadSha512: createHash("sha512").update(payloadBytes).digest("hex"),
    }).finish();
    // sign header
    const signature = signer.sign(transactionHeaderBytes);
    // signed tx
    const transaction = protobuf.Transaction.create({
      header: transactionHeaderBytes,
      headerSignature: signature,
      payload: payloadBytes,
    });
    // return signed tx
    return transaction;
  });
}

function signBatch(signedTxs) {
  //create header
  const batchHeaderBytes = protobuf.BatchHeader.encode({
    signerPublicKey: signer.getPublicKey().asHex(),
    transactionIds: signedTxs.map((txn) => txn.headerSignature),
  }).finish();
  // sign header
  const signature = signer.sign(batchHeaderBytes);
  // create a batch
  const batch = protobuf.Batch.create({
    header: batchHeaderBytes,
    headerSignature: signature,
    transactions: signedTxs,
  });
  // create batchlist
  const batchListBytes = protobuf.BatchList.encode({
    batches: [batch],
  }).finish();
  return batchListBytes;
}
