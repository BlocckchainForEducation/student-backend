const express = require("express");
const router = express.Router();
const { authen, author } = require("../user-mng/permission/protect-middleware");
const { ROLE } = require("../user-mng/role");

router.post("/decrypt-data", authen, author(ROLE.STUDENT), async (req, res) => {
  try {
    const body = req.body;
    const privateKey = body.privateKey;
    const encryptedCert = body.certificate;
    const encryptedSubjectList = body.subjectPointList;
    // if (!privateKey || !encryptedCert || !encryptedSubjectList) {
    //   return res.status(400).json("bad request, check post data: privatekey, encrpyt cert, encrpyt subject list");
    // }
    const decryptedCert = decryptCert(privateKey, encryptedCert);
    const decryptedSubjectList = decryptSubjectList(privateKey, encryptedSubjectList);
    res.json({ decrytedData: { certificate: decryptedCert, subjectPointList: decryptedSubjectList } });
  } catch (error) {
    res.status(500).json(error);
  }
});

// TODO: decrypt real data
function decryptCert(privateKey, encryptedCert) {
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

// TODO: decrypt real data
function decryptSubjectList(privateKey, encryptedSubjectList) {
  return [
    {
      semester: "20161",
      codename: "MI1100",
      name: "Giải Tích 1",
      halfSemesterPoint: "8",
      finalSemesterPoint: "9",
      rank: "A",
      txid: "0x12a243c9879cd78a68a6fa",
    },
    {
      semester: "20161",
      codename: "MI1100",
      name: "Giải Tích 1",
      halfSemesterPoint: "8",
      finalSemesterPoint: "9",
      rank: "A",
      txid: "0x12a243c9879cd78a68a6fa",
    },
    {
      semester: "20161",
      codename: "MI1100",
      name: "Giải Tích 1",
      halfSemesterPoint: "8",
      finalSemesterPoint: "9",
      rank: "A",
      txid: "0x12a243c9879cd78a68a6fa",
    },
    {
      semester: "20161",
      codename: "MI1100",
      name: "Giải Tích 1",
      halfSemesterPoint: "8",
      finalSemesterPoint: "9",
      rank: "A",
      txid: "0x12a243c9879cd78a68a6fa",
    },
  ];
}

module.exports = router;
