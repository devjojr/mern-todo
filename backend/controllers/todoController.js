const Todo = require("../models/todoModel");
const mongoose = require("mongoose");

// get all todos
const getAllTodos = async (req, res) => {
  const user_id = req.user._id;
  const todos = await Todo.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(todos);
};

// get a todo
const getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json(todo);
};

// create a todo
const createTodo = async (req, res) => {
  const { title, description } = req.body;

  let formErrors = [];

  if (!title) {
    formErrors.push("title");
  }

  if (!description) {
    formErrors.push("description");
  }

  if (formErrors.length > 0) {
    return res.status(400).json({ error: "Invalid form values", formErrors });
  }

  try {
    const user_id = req.user._id;
    const todo = await Todo.create({ title, description, user_id });
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a todo
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Cannot delete todo not found" });
  }

  const todo = await Todo.findOneAndDelete({ _id: id });

  if (!todo) {
    return res.status(404).json({ error: "Cannot delete todo not found" });
  }

  res.status(200).json(todo);
};

module.exports = {
  getAllTodos,
  getTodo,
  createTodo,
  deleteTodo,
};
