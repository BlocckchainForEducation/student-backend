const express = require("express");
const router = express.Router();
const { authen, author } = require("../user-mng/permission/protect-middleware");
const { ROLE } = require("../user-mng/role");
const jwt = require("jsonwebtoken");

router.post("/gen-token", authen, author(ROLE.STUDENT), async (req, res) => {
  try {
    const token = jwt.sign(req.body, process.env.TOKEN_SECRET);
    res.json({ token: token });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
