const express = require("express");
const router = express.Router();
const { authen, author } = require("../user-mng/permission/protect-middleware");
const { ROLE } = require("../user-mng/role");
const connection = require("../../db");
const { DB_NAME } = require("../../constance");
const COLL_NAME = "SawtoothAccounts";

router.get("/sawtooth-accounts", authen, author(ROLE.STUDENT), async (req, res) => {
  try {
    const col = (await connection).db(DB_NAME).collection(COLL_NAME);
    const accs = await col.find({ uid: req.user.uid }).toArray();
    res.json(accs);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/sawtooth-accounts", authen, author(ROLE.STUDENT), async (req, res) => {
  try {
    const col = (await connection).db(DB_NAME).collection(COLL_NAME);
    let newAcc = req.body;
    newAcc.uid = req.user.uid;
    if (newAcc.privateKey === "") {
      newAcc.privateKey = false;
    }
    const opResult = await col.insertOne(newAcc);
    res.json(opResult);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
