const express = require("express");
const {
  getAllTodos,
  getTodo,
  createTodo,
  deleteTodo,
} = require("../controllers/todoController");
const authUser = require("../middleware/authUser");
const router = express.Router();

// check if the user is authenticated
router.use(authUser);

// get all todos
router.get("/", getAllTodos);

// get a todo
router.get("/:id", getTodo);

// create a new todo
router.post("/", createTodo);

// delete a todo
router.delete("/:id", deleteTodo);

module.exports = router;
