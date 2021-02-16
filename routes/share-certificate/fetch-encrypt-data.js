const express = require("express");
const router = express.Router();
const { authen } = require("../acc/protect-middleware");
const ecies = require("ecies-geth");
const axios = require("axios").default;

router.get("/encrypted-data", authen, async (req, res) => {
  try {
    const publicKeyHex = req.query.publicKeyHex;
    try {
      const response = await axios.get("/student_data/" + publicKeyHex);
      res.json(response.data);
    } catch (error) {
      if (error.response) return res.status(502).json({ msg: error.response.data.error });
      else return res.status(502).json({ msg: error });
    }
  } catch (error) {
    res.status(500).json(error.toString());
  }
});

// TODO: talk to sawtooth api, then reformat to the schema front-end require
async function fetchEncryptDataOfAccountMockup(publicKeyHex) {
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
        active: Math.floor(Math.random() * 10) % 2 == 0,
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

module.exports = router;
