const todos = require('./todos.model');

const invalidId = (next, error) => {
  next(
    error.message.includes('Argument')
      ? new Error('Please enter a valid id')
      : error,
  );
};

const getTodos = async (req, res, next) => {
  try {
    const todo = await todos.find({});
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const getCompletedTodos = async (req, res, next) => {
  try {
    const todo = await todos.find({ completed: true });
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const getNotCompletedTodos = async (req, res, next) => {
  try {
    const todo = await todos.find({ completed: false });
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    const todo = await todos.findOne({ _id });
    res.json(todo);
  } catch (error) {
    invalidId(next, error);
  }
};

const createTodo = async (req, res, next) => {
  const { title, completed } = req.body;
  try {
    const newTodo = await todos.insert({
      title,
      completed: completed || false,
    });
    res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

const editTodoById = async (req, res, next) => {
  const { id: _id } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await todos.findOne({ _id });
    if (todo) {
      const updatedTodo = await todos.findOneAndUpdate(
        { _id },
        {
          $set: {
            title: title || todo.title,
            completed: completed !== undefined ? completed : todo.completed,
          },
        },
      );
      res.status(202).json(updatedTodo);
    }
  } catch (error) {
    invalidId(next, error);
  }
};

const deleteTodoById = async (req, res, next) => {
  const { id: _id } = req.params;
  try {
    const del = await todos.remove({ _id });
    res.status(202).json(del.result);
  } catch (error) {
    invalidId(next, error);
  }
};

const deleteTodos = async (req, res, next) => {
  try {
    const del = await todos.remove({});
    res.status(202).json(del.result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTodos,
  getCompletedTodos,
  getNotCompletedTodos,
  getTodoById,
  createTodo,
  editTodoById,
  deleteTodoById,
  deleteTodos,
};
