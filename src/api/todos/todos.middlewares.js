const schema = require('./todos.schema');

const validateSchema = (isPostMethod = false) => (req, res, next) => {
  const validationSchema = isPostMethod ? schema.postSchema : schema.patchSchema;
  const value = validationSchema.validate(req.body);
  if (!value.error) {
    next();
  } else {
    if (value.error.message.includes('title')) {
      value.error.message = 'Invalid todo title';
    } else if (value.error.message.includes('completed')) {
      value.error.message = 'Invalid completed field';
    }
    res.status(422);
    next(value.error);
  }
};

module.exports = {
  validateSchema,
};
