const express = require("express");
const router = express.Router();
const { authen, author } = require("../user-mng/permission/protect-middleware");
const { ROLE } = require("../user-mng/role");
const { fetchEncryptDataOfAccount } = require("./sawtooth-cli");

router.get("/encrypted-data", authen, author(ROLE.STUDENT), async (req, res) => {
  const publicKey = req.publicKey;
  const encryptData = await fetchEncryptDataOfAccount(publicKey);
  res.json(encryptData);
});

module.exports = router;
