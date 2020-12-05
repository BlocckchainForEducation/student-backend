const express = require("express");
const router = express.Router();

const profileRouter = require("./profile/profile");
router.use(profileRouter);

const sawtoothAccsRouter = require("./sawtooth-acc/sawtooth-accs");
router.use(sawtoothAccsRouter);

const fetchEncryptData = require("./share-certificate/fetch-encrypt-data");
router.use(fetchEncryptData);

const decryptData = require("./share-certificate/decrypt-data");
router.use(decryptData);

const genToken = require("./share-certificate/gen-token");
router.use(genToken);

module.exports = router;
