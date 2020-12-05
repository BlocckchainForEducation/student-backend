const express = require("express");
const router = express.Router();
const { authen } = require("../../user-mng/permission/protect-middleware");
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
    res.status(500).json(error);
  }
});

async function decryptCert(privateKeyHex, certificate) {
  // const privateKeyBuffer = Buffer.from(privateKey, "hex");
  // const encryptedCertBuffer = Buffer.from(encryptedCert, "hex");
  // return JSON.parse((await ecies.decrypt(privateKeyBuffer, encryptedCertBuffer)).toString());
  return {
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
    blockid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
    txid: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
    address: "0xb27677b99155aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a0188",
  };
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
  for (let i = 0; i <= 50; i++) {
    subjectList.push({
      plain: {
        semester: "20161",
        codename: "MI1100",
        name: "Giải Tích 1",
        credit: 3,
        halfSemesterPoint: "8",
        finalSemesterPoint: "9",
        rank: "A",
        pointBase4: 4,
        txid: "0x12a243c9879cd78a68a6fa",
      },
      blockid: "9155aeb456f52b30f1a36d2f589e5446967d373a0" + i,
      txid: "0xb27677b99155aeb1813e924c89b456f52ba36d2f443a0188" + i,
      address: "55aeb1813e924c89b456f52b30f1a36d2f589e5446967d373a" + i,
    });
  }
  return subjectList;
}

module.exports = router;
