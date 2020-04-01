const AdminModel = require("../models/admins");
const Joi = require("@hapi/joi");
const bcrypt = require("bcryptjs");

const ValidationSchema = Joi.object().keys({
  code: Joi.string(),
  name: Joi.string()
    .min(6)
    .required(),
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required(),
  authorizedBy: Joi.string()
    .min(6)
    .required()
});

/* create an admin */
const registerAdmin = async req => {
  const { error } = ValidationSchema.validate(req.body);
  if (error) return { status: 400, message: error.details[0].message };

  //Hash the password
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const admin = new AdminModel(req.body);
  try {
    await admin.save().then(item => item);
    return {
      status: 200,
      message: "Registration successful! Please log in using your credentials"
    };
  } catch (e) {
    return { status: 400, message: e.message };
  }
};

module.exports = registerAdmin;
