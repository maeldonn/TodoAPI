const express = require('express');

const controllers = require('./todos.controllers');
const middlewares = require('./todos.middlewares');

const router = express.Router();

// GET /api/v1/todos/
router.get('/', controllers.getTodos);

// GET /api/v1/todos/completed
router.get('/completed', controllers.getCompletedTodos);

// GET /api/v1/todos/tocomplete
router.get('/tocomplete', controllers.getNotCompletedTodos);

// GET /api/v1/todos/:id
router.get('/:id', controllers.getTodoById);

// POST /api/v1/todos/
router.post('/', middlewares.validateSchema(true), controllers.createTodo);

// PATCH /api/v1/todos/
router.patch('/:id', middlewares.validateSchema(), controllers.editTodoById);

// DELETE /api/v1/todos/:id
router.delete('/:id', controllers.deleteTodoById);

// DELETE /api/v1/todos/
router.delete('/', controllers.deleteTodos);

module.exports = router;
