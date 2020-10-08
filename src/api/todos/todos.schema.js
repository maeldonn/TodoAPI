const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),
  completed: Joi.boolean(),
});

module.exports = schema;
