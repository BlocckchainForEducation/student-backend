const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { authen, author } = require("../user-mng/permission/protect-middleware");
const { ROLE } = require("../user-mng/role");
const connection = require("../../db");
const { DB_NAME } = require("../../constance");
const STUDENT = "Student";
const { profileSchema } = require("./schema");

router.get("/profile", authen, author(ROLE.STUDENT), async (req, res) => {
  try {
    const col = (await connection).db(DB_NAME).collection(STUDENT);
    const profile = await col.findOne({ uid: req.user.uid });
    res.json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/profile", authen, author(ROLE.STUDENT), async (req, res) => {
  try {
    const { error } = profileSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = {};
      for (let err of error.details) {
        errors[err.context.key] = err.message;
      }
      return res.status(400).json(errors);
    }

    const col = (await connection).db(DB_NAME).collection(STUDENT);
    // replaceOne not allow mutate _id
    delete req.body._id;
    req.body.uid = req.user.uid;
    const opResult = await col.updateOne({ uid: req.user.uid }, { $set: req.body }, { upsert: true });
    res.json(opResult.result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/change-avatar", authen, author(ROLE.STUDENT), upload.single("avatar"), async (req, res) => {
  try {
    const col = (await connection).db(DB_NAME).collection(STUDENT);
    const imgBase64 = req.file.buffer.toString("base64");
    const imgSrc = `data:${req.file.mimetype};base64,${imgBase64}`;
    const opResult = await col.updateOne({ uid: req.user.uid }, { $set: { imgSrc: imgSrc } }, { upsert: true });
    console.log(opResult);
    res.json(imgSrc);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
