const ecies = require("ecies-geth");

// TODO: talk to sawtooth api, then reformat to the schema front-end require
async function fetchEncryptDataOfAccount(publicKeyHex) {
  const publicKeyHex65 = "04" + publicKeyHex;
  const mockupCertificateData = {
    name: "Nguyễn Văn An",
    birthday: "01/01/1998",
    gender: "Nam",
    university: "Đại học Bách Khoa Hà Nội",
    faculty: "Công nghệ thông tin",
    degree: "Kỹ sư",
    gradyear: "2019",
    level: "Giỏi",
    eduform: "Chính quy",
    issuelocation: "Hà Nội",
    issuedate: "20/08/2019",
    headmaster: "Hoàng Minh Sơn",
    regisno: "12431",
    globalregisno: "12341231431",
  };
  const cipher = (await ecies.encrypt(Buffer.from(publicKeyHex65, "hex"), Buffer.from(JSON.stringify(mockupCertificateData)))).toString("hex");
  const certificate = {
    address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
    versions: [
      {
        txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
        timestamp: 18979427394,
        active: true,
        cipher: cipher,
      },
      {
        txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0189",
        timestamp: 18979427395,
        active: false,
        cipher: cipher,
      },
    ],
  };
  // make sure sort the versions
  certificate.versions.sort((a, b) => b.timestamp - a.timestamp);

  const mockupSubjectList = [];
  for (let i = 0; i <= 40; i++) {
    mockupSubjectList.push({
      semester: "20161",
      codename: "MI1100",
      name: "Giải Tích " + i,
      halfSemesterPoint: "8",
      finalSemesterPoint: "9",
      rank: "A",
      txid: "0x12a243c9879cd78a68a6fa" + i,
    });
  }

  const ciphersBuf = await Promise.all(
    mockupSubjectList.map(async (subject) => await ecies.encrypt(Buffer.from(publicKeyHex65, "hex"), Buffer.from(JSON.stringify(subject))))
  );
  const subjects = ciphersBuf.map((cipherBuf, index) => ({
    address: "55aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a" + index,
    versions: [
      {
        txid: "0xb27677b99155aeb1813e924c89b456f52ba36d2f443a0188" + index,
        timestamp: 127928686234,
        active: true,
        cipher: cipherBuf.toString("hex"),
      },
    ],
  }));

  return Promise.resolve({ publicKeyHex, certificate, subjects });
}

module.exports = { fetchEncryptDataOfAccount };

// fetchDataOfAccountOnBlockchain: (input: publicKeyHex, output: obj - schema1)
// const schema1 = {
//   publicKeyHex: "luaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwi",
//   certificate: {
//     cipher: "ImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFscmVnaXNubyI6IjEyMzQxMj....",
//     blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//   },
//   subjects: [
//     {
//       cipher: "ImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFscmVnaXNubyI6IjEyMzQxMj....",
//       blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     },
//     {
//       cipher: "ImhlYWRtYXN0ZXIiOiJIb8OgbmcgTWluaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwiZ2xvYmFscmVnaXNubyI6IjEyMzQxMj....",
//       blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     },
//   ],
// };

// decryptData (input: obj - schema1 +, output: obj - schema2)
// const schema2 = {
//   publicKeyHex: "luaCBTxqFuIiwicmVnaXNubyI6IjEyNDMxIiwi",
//   certificate: {
//     plain: {
//       name: "Nguyễn Văn An",
//       birthday: "01/01/1998",
//       gender: "Nam",
//       university: "Đại học Bách Khoa Hà Nội",
//       faculty: "Công nghệ thông tin",
//       degree: "Kỹ sư",
//       gradyear: "2019",
//       level: "Giỏi",
//       eduform: "Chính quy",
//       issuelocation: "Hà Nội",
//       issuedate: "20/08/2019",
//       headmaster: "Hoàng Minh Sơn",
//       regisno: "12431",
//       globalregisno: "12341231431",
//     },
//     blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//   },
//   subjects: [
//     {
//       plain: {
//         semester: "20161",
//         codename: "MI1100",
//         name: "Giải Tích 1",
//         halfSemesterPoint: "8",
//         finalSemesterPoint: "9",
//         rank: "A",
//         txid: "0x12a243c9879cd78a68a6fa",
//       },
//       blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     },
//     {
//       plain: {
//         semester: "20161",
//         codename: "MI1100",
//         name: "Giải Tích 1",
//         halfSemesterPoint: "8",
//         finalSemesterPoint: "9",
//         rank: "A",
//         txid: "0x12a243c9879cd78a68a6fa",
//       },
//       blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//       address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
//     },
//   ],
// };

// getToken: (input: obj - schema2, output: token - jwt.sign(input, secret))

// getCipherDataOfTx: (input: txid - string, output: cipher, timestampe - string)

// write point of subject to blockchain
// Frontend: privateKey, classId, excelFile
// Backend: forward to sawtooth-cli api
// Sawtooth Cli api: parse excel -> for each record -> encrypt with student's public key -> make payload: {classId: classId, subjectPoint: [cipher1, cipher2,... ]} -> sign with teacher private key -> send to processor handler -> check if teacher has priviledge to write on that classId -> if ok, caculate address for that classId, setState(address, subjectPoint)
//
