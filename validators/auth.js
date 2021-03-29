const Joi = require('joi');

const validateSignup = (body) => {
  const schema = Joi.object({
    firstName: Joi.string().required().min(3).max(50),
    lastName: Joi.string().required().min(3).max(50),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(255),
  });

  return schema.validate(body);
};

const validateSignin = (body) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().max(255),
  });

  return schema.validate(body);
};

module.exports = { validateSignup, validateSignin };
