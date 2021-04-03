const express = require("express");
const router = express.Router();
const { authen } = require("../acc/protect-middleware");
const jwt = require("jsonwebtoken");

router.post("/gen-token", authen, async (req, res) => {
  try {
    const decryptedData = req.body;
    const versions = decryptedData.certificate.versions;
    // do not sort still ok, we will use the last index of array for the newst version
    // versions.sort((a, b) => b.timestamp - a.timestamp);
    if (versions[versions.length - 1].type !== "revoke") {
      const token = jwt.sign(req.body, process.env.TOKEN_SECRET);
      res.json({ token });
    } else {
      res.status(400).json({ msg: "Cannot create token for revoked certificate!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
