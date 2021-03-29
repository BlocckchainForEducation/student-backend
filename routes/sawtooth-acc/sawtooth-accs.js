const express = require("express");
const router = express.Router();
const { authen } = require("../acc/protect-middleware");
const connection = require("../../db");
const COLL_NAME = "SawtoothAccounts";

router.get("/sawtooth-accounts", authen, async (req, res) => {
  try {
    const col = (await connection).db().collection(COLL_NAME);
    const accs = await col.find({ uid: req.user.uid }).toArray();
    res.json(accs);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/sawtooth-accounts", authen, async (req, res) => {
  try {
    const col = (await connection).db().collection(COLL_NAME);
    let newAcc = req.body;
    newAcc.uid = req.user.uid;
    if (newAcc.privateKeyHex === "") {
      newAcc.privateKeyHex = false;
    }
    const opResult = await col.insertOne(newAcc);
    res.json(opResult);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/sawtooth-accounts", authen, async (req, res) => {
  try {
    const col = (await connection).db().collection(COLL_NAME);
    const opResult = await col.deleteOne({
      uid: req.user.uid,
      publicKeyHex: req.body.publicKeyHex,
    });
    res.json(opResult.result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
