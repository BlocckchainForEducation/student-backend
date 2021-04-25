const express = require("express");
const router = express.Router();
const { authen } = require("../acc/protect-middleware");
const { decryptCert, decryptSubjects } = require("../utils");

router.post("/decrypt-eduprogram", authen, async (req, res) => {
  try {
    const privateKeyHex = req.body.privateKeyHex;
    const encryptData = req.body.selectedEduProgram;
    if (!privateKeyHex || !encryptData) return res.status(400).json("bad request, check body: privateKeyHex, encrpytData");

    let certificate;
    if (encryptData.certificate?.versions) {
      certificate = decryptCert(privateKeyHex, encryptData.certificate);
    }
    const subjects = decryptSubjects(privateKeyHex, encryptData.subjects);
    return res.json({ certificate, subjects });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.toString());
  }
});

module.exports = router;
