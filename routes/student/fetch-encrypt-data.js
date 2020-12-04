const express = require("express");
const router = express.Router();
const { authen, author } = require("../user-mng/permission/protect-middleware");
const { ROLE } = require("../user-mng/role");
const sawtoothCli = require("./sawtooth-cli");

router.get("/encrypted-data", authen, author(ROLE.STUDENT), async (req, res) => {
  try {
    const publicKeyHex = req.query.publicKeyHex;
    const encryptData = await sawtoothCli.fetchEncryptDataOfAccount(publicKeyHex);
    res.json(encryptData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
