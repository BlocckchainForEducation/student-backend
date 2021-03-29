const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const { authen } = require("../acc/protect-middleware");
const connection = require("../../db");
const PROFILE = "Profile";
const { profileSchema } = require("./schema");

router.get("/profile", authen, async (req, res) => {
  try {
    const col = (await connection).db().collection(PROFILE);
    const profile = await col.findOne({ uid: req.user.uid });
    res.json(profile);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/profile", authen, async (req, res) => {
  try {
    const { error } = profileSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = {};
      for (let err of error.details) {
        errors[err.context.key] = err.message;
      }
      return res.status(400).json(errors);
    }

    const col = (await connection).db().collection(PROFILE);
    // replaceOne not allow mutate _id
    delete req.body._id;
    req.body.uid = req.user.uid;
    const opResult = await col.updateOne(
      { uid: req.user.uid },
      { $set: req.body },
      { upsert: true }
    );
    res.json(opResult.result);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post(
  "/change-avatar",
  authen,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const col = (await connection).db().collection(PROFILE);
      const imgBase64 = req.file.buffer.toString("base64");
      const imgSrc = `data:${req.file.mimetype};base64,${imgBase64}`;
      const opResult = await col.updateOne(
        { uid: req.user.uid },
        { $set: { imgSrc: imgSrc } },
        { upsert: true }
      );
      res.json(imgSrc);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;
