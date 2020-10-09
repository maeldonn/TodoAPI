const db = require('../../db/connect');

const todos = db.get('todos');

module.exports = todos;
