const express = require('express');

const todos = require('./todos/todos.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'API is working ✅',
  });
});

router.use('/todos', todos);

module.exports = router;
