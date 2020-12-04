const express = require("express");
const router = express.Router();
const { authen, author } = require("../user-mng/permission/protect-middleware");
const { ROLE } = require("../user-mng/role");
const ecies = require("ecies-geth");

router.post("/decrypt-data", authen, author(ROLE.STUDENT), async (req, res) => {
  try {
    console.log(req.body);
    const privateKey = req.body.privateKey;
    const encryptedCert = req.body.encryptData.certificate;
    const encryptedSubjectList = req.body.encryptData.subjectPointList;
    if (!privateKey || !encryptedCert || !encryptedSubjectList) {
      return res.status(400).json("bad request, check post data: privatekey, encrpyt cert, encrpyt subject list");
    }
    const decryptedCert = await decryptCert(privateKey, encryptedCert);
    const decryptedSubjectList = await decryptSubjectList(privateKey, encryptedSubjectList);
    res.json({ decrytedData: { certificate: decryptedCert, subjectPointList: decryptedSubjectList } });
  } catch (error) {
    res.status(500).json(error);
  }
});

async function decryptCert(privateKey, encryptedCert) {
  // const privateKeyBuffer = Buffer.from(privateKey, "hex");
  // const encryptedCertBuffer = Buffer.from(encryptedCert, "hex");
  // return JSON.parse((await ecies.decrypt(privateKeyBuffer, encryptedCertBuffer)).toString());
  return {
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
}

async function decryptSubjectList(privateKey, encryptedSubjectList) {
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
      semester: "20161",
      codename: "MI1100",
      name: "Giải Tích 1",
      halfSemesterPoint: "8",
      finalSemesterPoint: "9",
      rank: "A",
      txid: "0x12a243c9879cd78a68a6fa",
    });
  }
  return subjectList;
}

module.exports = router;
