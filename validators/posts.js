const Joi = require('joi');

const validateNewPost = (body) => {
  const schema = Joi.object({
    title: Joi.string().required().max(50),
    description: Joi.string().required().max(100),
    privacy: Joi.number().required().valid(1, 2),
    tags: Joi.array().items(Joi.string()),
  });

  return schema.validate(body);
};

module.exports = { validateNewPost };
