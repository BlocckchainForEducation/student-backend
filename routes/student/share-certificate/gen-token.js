const express = require("express");
const router = express.Router();
const { authen } = require("../../user-mng/permission/protect-middleware");
const jwt = require("jsonwebtoken");

router.post("/gen-token", authen, async (req, res) => {
  try {
    const token = jwt.sign(req.body, process.env.TOKEN_SECRET);
    res.json({ token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
