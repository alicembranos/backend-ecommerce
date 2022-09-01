//VALIDATION
const Joi = require("@hapi/joi");

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    firstname: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    genre: Joi.string(),
    age: Joi.number().integer().min(18).max(120),
    wishlist: Joi.array(),
    ordersList: Joi.array(),
  });
  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
