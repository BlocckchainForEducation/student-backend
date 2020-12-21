const express = require("express");
const router = express.Router();
const { authen } = require("../acc/protect-middleware");
const ecies = require("ecies-geth");
const secp256k1 = require("secp256k1");

router.post("/decrypt-data", authen, async (req, res) => {
  try {
    const privateKeyHex = req.body.privateKeyHex;
    const publicKeyHex65 = Buffer.from(secp256k1.publicKeyCreate(Buffer.from(privateKeyHex, "hex"), false)).toString("hex");
    const encryptData = req.body.encryptData;
    if (!privateKeyHex || !encryptData) return res.status(400).json("bad request, check body: privateKeyHex, encrpytData");
    const certificate = await decryptCert(privateKeyHex, encryptData.certificate);
    const subjects = await decryptSubjects(privateKeyHex, encryptData.subjects);
    res.json({ publicKeyHex: encryptData.publicKeyHex, publicKeyHex65, certificate, subjects });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.toString());
  }
});

async function decryptCert(privateKeyHex, encryptedCertificate) {
  const privateKeyBuffer = Buffer.from(privateKeyHex, "hex");
  const promises = encryptedCertificate.versions.map(async (version) => {
    const cipherHex = version.cipher;
    const cipherBuff = Buffer.from(cipherHex, "hex");
    const plainBuff = await ecies.decrypt(privateKeyBuffer, cipherBuff);
    const plainJsonString = plainBuff.toString();
    const plainObject = JSON.parse(plainJsonString);
    version.plain = plainObject;
    return version;
  });
  const versions = await Promise.all(promises);
  const decryptedCert = { ...encryptedCertificate, versions: versions };
  return decryptedCert;
}

async function decryptSubjects(privateKeyHex, encryptedSubjects) {
  const privateKeyBuffer = Buffer.from(privateKeyHex, "hex");
  const subjectPromises = encryptedSubjects.map(async (encryptedSubject) => {
    const versions = encryptedSubject.versions;
    const promises = versions.map(async (version) => {
      const cipherHex = version.cipher;
      const cipherBuff = Buffer.from(cipherHex, "hex");
      const plainBuff = await ecies.decrypt(privateKeyBuffer, cipherBuff);
      const plainJsonString = plainBuff.toString();
      const plainObject = JSON.parse(plainJsonString);
      version.plain = plainObject;
      return version;
    });
    const decryptedVersions = await Promise.all(promises);
    const decryptedSuject = { ...encryptedSubject, versions: decryptedVersions };
    return decryptedSuject;
  });
  const decryptedSubjects = await Promise.all(subjectPromises);
  return decryptedSubjects;
}

module.exports = router;
