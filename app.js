const express = require('express');

const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const Todo = require('./models/todo');

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

mongoose
  .connect('mongodb://localhost:27017/todo', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion to MongoDB successful !'))
  .catch(() => console.log('Connexion to MongoDB failed !'));

// Page d'acceuil de l'API
// TODO : Documentation
app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/views/index.html`));
});

// Récupérer la liste de toutes les tâches
// GET /todo
app.get('/todo/', async (req, res) => {
  const todo = await Todo.find();
  res.json(todo);
});

// Récupérer la liste de toutes les tâches terminées
// GET /todo/completed
app.get('/todo/completed/', async (req, res) => {
  const todo = await Todo.find({ completed: true });
  res.json(todo);
});

// Récupérer la liste de toutes les tâches non terminées
// GET /todo/tocomplete
app.get('/todo/tocomplete/', async (req, res) => {
  const todo = await Todo.find({ completed: false });
  res.json(todo);
});

// Récupérer une tâche avec son identifiant
// GET /todo/:id
app.get('/todo/:id', async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const todo = await Todo.findById(id);
  res.json(todo);
});

// Ajouter une tâche
// POST /todo
app.post('/todo/', async (req, res) => {
  let { title, completed } = req.body;
  if (title === undefined) {
    title = '';
  } else if (completed === undefined) {
    completed = false;
  }
  const newTask = new Todo({
    title,
    completed,
  });
  await newTask.save();
  res.json(newTask);
});

// Modifier une tâche
// PATCH /todo
app.patch('/todo/:id', async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const todo = await Todo.findById(id);
  if (title) {
    todo.title = title;
  }
  if (completed) {
    todo.completed = completed;
  }
  await todo.save();
  res.json(todo);
});

// Supprimer une tâche
// DELETE /todo/:id
app.delete('/todo/:id', async (req, res) => {
  const suppr = await Todo.findByIdAndDelete(req.params.id);
  res.json(suppr);
});

// Supprimer toutes les tâches
// DELETE /todo
app.delete('/todo/', async (req, res) => {
  const suppr = await Todo.deleteMany({});
  res.json(suppr);
});

app.listen(8080);
