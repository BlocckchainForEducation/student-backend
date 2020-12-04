const ecies = require("ecies-geth");

// TODO: talk to sawtooth api, then reformat to the schema front-end require
async function fetchEncryptDataOfAccount(publicKeyHex) {
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
  const mockupSubjectList = new Array(50).map(() => ({
    semester: "20161",
    codename: "MI1100",
    name: "Giải Tích 1",
    halfSemesterPoint: "8",
    finalSemesterPoint: "9",
    rank: "A",
    txid: "0x12a243c9879cd78a68a6fa",
  }));
  console.log("publicKeyHex: " + publicKeyHex);
  const publicKeyBuffer = Buffer.from(publicKeyHex, "hex");
  const certificateBuffer = Buffer.from(JSON.stringify(mockupCertificateData));
  const encryptedCert = (await ecies.encrypt(publicKeyBuffer, certificateBuffer)).toString("hex");

  const subjectBufferList = mockupSubjectList.map((subject) => Buffer.from(JSON.stringify(subject)));
  const listEncryptedSubjectBuffer = await Promise.all(subjectBufferList.map((subjectBuffer) => ecies.encrypt(publicKeyBuffer, subjectBuffer)));
  const listEncryptedSubjectHex = listEncryptedSubjectBuffer.map((encryptedSubjectBuffer) => encryptedSubjectBuffer.toString("hex"));

  return Promise.resolve({ encryptedDataOfAccount: { certificate: encryptedCert, subjectPointList: listEncryptedSubjectHex } });
}

module.exports = { fetchEncryptDataOfAccount };
