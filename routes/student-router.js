const express = require("express");
const router = express.Router();

router.use(require("./profile/profile"));

router.use(require("./sawtooth-acc/sawtooth-accs"));

router.use(require("./share-certificate/fetch-encrypt-data"));

router.use(require("./share-certificate/decrypt-data"));

router.use(require("./share-certificate/gen-token"));

router.use(require("./share-cv"));

module.exports = router;
