const express = require("express");
const router = express.Router();
const { authen } = require("../acc/protect-middleware");
const { decrypt } = require("eciesjs");

router.post("/decrypt-eduprogram", authen, async (req, res) => {
  try {
    const privateKeyHex = req.body.privateKeyHex;
    const encryptData = req.body.selectedEduProgram;
    if (!privateKeyHex || !encryptData) return res.status(400).json("bad request, check body: privateKeyHex, encrpytData");

    let certificate;
    if (encryptData.certificate?.versions) {
      certificate = await decryptCert(privateKeyHex, encryptData.certificate);
    }
    const subjects = await decryptSubjects(privateKeyHex, encryptData.subjects);
    return res.json({ certificate, subjects });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.toString());
  }
});

function decryptCert(privateKeyHex, encryptedCertificate) {
  const versions = encryptedCertificate.versions.map((version) => {
    const cipherHex = version.cipher;
    const cipherBuff = Buffer.from(cipherHex, "hex");
    const plainBuff = decrypt(privateKeyHex, cipherBuff);
    const plainJsonString = plainBuff.toString();
    const plainObject = JSON.parse(plainJsonString);
    version.plain = plainObject;
    return version;
  });
  const decryptedCert = { ...encryptedCertificate, versions: versions };
  return decryptedCert;
}

function decryptSubjects(privateKeyHex, encryptedSubjects) {
  const decryptedSubjects = encryptedSubjects.map((encryptedSubject) => {
    const versions = encryptedSubject.versions;
    const decryptedVersions = versions.map((version) => {
      const cipherHex = version.cipher;
      const cipherBuff = Buffer.from(cipherHex, "hex");
      const plainBuff = decrypt(privateKeyHex, cipherBuff);
      const plainJsonString = plainBuff.toString();
      const plainObject = JSON.parse(plainJsonString);
      version.plain = plainObject;
      return version;
    });
    const decryptedSuject = {
      ...encryptedSubject,
      versions: decryptedVersions,
    };
    return decryptedSuject;
  });
  return decryptedSubjects;
}

module.exports = router;
