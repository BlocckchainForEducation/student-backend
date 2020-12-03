const express = require("express");
const router = express.Router();

const profileRouter = require("./profile");
router.use(profileRouter);

const sawtoothAccsRouter = require("./sawtooth-accs");
router.use(sawtoothAccsRouter);

const fetchEncryptData = require("./fetch-encrypt-data");
router.use(fetchEncryptData);

module.exports = router;