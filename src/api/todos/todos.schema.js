const Joi = require('joi');

const postSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(30)
    .required(),
  completed: Joi.boolean(),
});

const patchSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(30),
  completed: Joi.boolean(),
});

module.exports = {
  postSchema,
  patchSchema,
};
