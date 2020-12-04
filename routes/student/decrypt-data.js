const express = require("express");
const router = express.Router();
const { authen, author } = require("../user-mng/permission/protect-middleware");
const { ROLE } = require("../user-mng/role");
const ecies = require("ecies-geth");

router.post("/decrypt-data", authen, author(ROLE.STUDENT), async (req, res) => {
  try {
    const privateKey = req.body.privateKey;
    const encryptedCert = req.body.certificate;
    const encryptedSubjectList = req.body.subjectPointList;
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
  const privateKeyBuffer = Buffer.from(privateKey, "hex");
  const encryptedCertBuffer = Buffer.from(encryptedCert, "hex");
  return JSON.parse((await ecies.decrypt(privateKeyBuffer, encryptedCertBuffer)).toString());
}

async function decryptSubjectList(privateKey, encryptedSubjectList) {
  const privateKeyBuffer = Buffer.from(privateKey, "hex");
  const arrayOfPromise = encryptedSubjectList
    .map((encryptedsubjectHex) => Buffer.from(encryptedsubjectHex, "hex"))
    .map((encryptedsubjectBuffer) => ecies.decrypt(privateKeyBuffer, encryptedsubjectBuffer));
  return (await Promise.all(arrayOfPromise))
    .map((decryptedSubjectBuffer) => decryptedSubjectBuffer.toString())
    .map((decryptedSujectString) => JSON.parse(decryptedSujectString));
}

module.exports = router;
