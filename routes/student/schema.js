const Joi = require("joi");

const profileSchema = Joi.object({
  _id: Joi.string(),
  sid: Joi.string(),
  name: Joi.string().required(),
  gender: Joi.any(),
  birthDay: Joi.string().required(),
  cmt: Joi.string().min(9).max(20),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/),
  hometown: Joi.string(),
  address: Joi.string(),
  description: Joi.string().max(1000),
  imgSrc: Joi.string(),
});

module.exports = { profileSchema };
