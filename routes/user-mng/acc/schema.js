const Joi = require("joi");
const { ROLE } = require("../role");

const signUpSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  repassword: Joi.ref("password"),
  role: Joi.string().valid(ROLE.STUDENT, ROLE.UNI_STAFF).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

module.exports = { signUpSchema, signInSchema };
