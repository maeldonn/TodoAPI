const schema = require('./todos.schema');

const validateSchema = (req, res, next) => {
  const value = schema.validate(req.body);
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
