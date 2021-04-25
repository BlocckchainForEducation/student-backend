const { decrypt } = require("eciesjs");

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

module.exports = { decryptCert, decryptSubjects };
