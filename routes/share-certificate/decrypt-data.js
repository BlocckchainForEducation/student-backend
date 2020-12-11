const express = require("express");
const router = express.Router();
const { authen } = require("../acc/protect-middleware");
// const ecies = require("ecies-geth");

router.post("/decrypt-data", authen, async (req, res) => {
  try {
    const privateKeyHex = req.body.privateKeyHex;
    const encryptData = req.body.encryptData;
    if (!privateKeyHex || !encryptData) {
      return res.status(400).json("bad request, check body: privateKeyHex, encrpytData");
    }
    const certificate = await decryptCert(privateKeyHex, encryptData.certificate);
    const subjects = await decryptSubjects(privateKeyHex, encryptData.subjects);
    res.json({ publicKeyHex: encryptData.publicKeyHex, certificate, subjects });
  } catch (error) {
    res.status(500).json(error.toString());
  }
});

async function decryptCert(privateKeyHex, certificate) {
  // const privateKeyBuffer = Buffer.from(privateKey, "hex");
  // const encryptedCertBuffer = Buffer.from(encryptedCert, "hex");
  // return JSON.parse((await ecies.decrypt(privateKeyBuffer, encryptedCertBuffer)).toString());

  const response = {
    address: "0xb27677b99155aeb1813e924c89b45689e5446967d373a0188",
    versions: [
      {
        txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0",
        timestamp: Date.now(),
        active: Date.now() % 2 == 0,
        plain: {
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
        },
      },
      {
        txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967",
        timestamp: Date.now() + 1000,
        active: Date.now() % 2 == 0,
        plain: {
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
        },
      },
    ],
  };
  response.versions.sort((a, b) => b.timestamp - a.timestamp);
  return response;
}

async function decryptSubjects(privateKey, subjects) {
  //   const privateKeyBuffer = Buffer.from(privateKey, "hex");
  //   const arrayOfPromise = encryptedSubjectList
  //     .map((encryptedsubjectHex) => Buffer.from(encryptedsubjectHex, "hex"))
  //     .map((encryptedsubjectBuffer) => ecies.decrypt(privateKeyBuffer, encryptedsubjectBuffer));
  //   return (await Promise.all(arrayOfPromise))
  //     .map((decryptedSubjectBuffer) => decryptedSubjectBuffer.toString())
  //     .map((decryptedSujectString) => JSON.parse(decryptedSujectString));
  const subjectList = [];
  for (let i = 0; i <= 40; i++) {
    subjectList.push({
      address: "55aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a" + i,
      versions: [
        {
          txid: "0xb27677b99155aeb1813e924c89b456f52ba36d2f443a0188" + i,
          timestamp: 12439849236,
          active: true,
          plain: {
            semester: "20161",
            codename: "MI1100",
            name: "Giải Tích " + i,
            credit: 3,
            halfSemesterPoint: "8",
            finalSemesterPoint: "9",
            rank: "A",
            pointBase4: 4,
            txid: "0x12a243c9879cd78a68a6fa",
          },
        },
      ],
    });
  }
  return subjectList;
}

module.exports = router;
