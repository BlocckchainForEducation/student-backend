const readXlsxFile = require("read-excel-file/node");
const { createHash } = require("crypto");
const { protobuf } = require("sawtooth-sdk");
const { createContext, CryptoFactory } = require("sawtooth-sdk/signing");
const { Secp256k1PrivateKey } = require("sawtooth-sdk/signing/secp256k1");
const context = createContext("secp256k1");

async function parseExcel(file, schema) {}
function makePayload(actionType,   objs) {
  return objs.map((obj) => {
    {action: action,
    }
  });
}

async function writeDataToBC(file, schema) {
  let { rows, errors } = readXlsxFile(file, { schema });
  // handle it instead of log!
  if (errors.length !== 0) console.log(errors);
  const payloads = rows.map(obj => ({action: 1, create_ministry}))
}

const objs = parseExcel(file, schema);
const payload = makePayload(objs);
