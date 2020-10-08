const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    completed: { type: Boolean },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('todo', todoSchema);
