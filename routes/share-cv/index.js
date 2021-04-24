const express = require("express");
const router = express.Router();
const { authen } = require("../acc/protect-middleware");
const connection = require("../../db");
const axios = require("axios").default;

router.get("/accounts-profile", authen, async (req, res) => {
  try {
    const accColl = (await connection).db().collection("SawtoothAccounts");
    const accs = await accColl.find({ uid: req.user.uid }).toArray();
    try {
      const profilePromises = accs.map(async (acc) => {
        const response = await axios.get("/student/data/" + acc.publicKeyHex);
        return response.data;
      });
      const profiles = await Promise.all(profilePromises);
      return res.json(profiles);
    } catch (error) {
      console.error(error);
      if (error.response) return res.status(502).send(error.response.data);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send(error.toString());
  }
});

module.exports = router;
