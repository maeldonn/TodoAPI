const Todo = require('./todos.model');

const getTodos = async (req, res, next) => {
  try {
    const todo = await Todo.find();
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const getCompletedTodos = async (req, res, next) => {
  try {
    const todo = await Todo.find({ completed: true });
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const getNotCompletedTodos = async (req, res, next) => {
  try {
    const todo = await Todo.find({ completed: false });
    res.json(todo);
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    res.json(todo);
  } catch (error) {
    next(error.message.includes('ObjectId') ? new Error('Please enter a correct id') : error);
  }
};

const createTodo = async (req, res, next) => {
  const { title, completed } = req.body;
  const newTask = new Todo({
    title,
    completed: completed || false,
  });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const editTodoById = async (req, res, next) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findById(id);
    if (title) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    await todo.save();
    res.status(202).json(todo);
  } catch (error) {
    next(error);
  }
};

const deleteTodoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const del = await Todo.findByIdAndDelete(id);
    res.status(202).json(del);
  } catch (error) {
    next(error);
  }
};

const deleteTodos = async (req, res, next) => {
  try {
    const del = await Todo.deleteMany({});
    res.json(del);
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
