import { useState } from "react";
import { useIAMContext } from "../hooks/useIAMContext";
import { useTodosContext } from "../hooks/useTodosContext";

const TodoForm = () => {
  const { user } = useIAMContext();
  const { dispatch } = useTodosContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("Must be logged in to add a todo");
      return;
    }

    const todo = { title, description };

    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setFormErrors(json.formErrors);
    }

    if (response.ok) {
      setTitle("");
      setDescription("");
      setError(null);
      setFormErrors([]);
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };

  return (
    <form className="create-todo" onSubmit={handleSubmit}>
      <h1 className="title is-size-5 has-text-centered">Add Todo</h1>
      <div className="field">
        <label className="label is-small">Title</label>
        <div className="control has-icons-left">
          <input
            className={`input${formErrors.includes("title") ? "error input": ""}`}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Buy Groceries"
          />
          <span className="icon is-small is-left">
            <i className="fas fa-pen"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label is-small">Description</label>
        <div className="field-body">
          <div className="field">
            <div className="control">
              <textarea
                className={`textarea${
                  formErrors.includes("description") ? "error textarea" : ""
                }`}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                placeholder="Milk, eggs, etc..."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button className="button is-success is-fullwidth is-small">
            <strong>Submit</strong>
          </button>
          {error && (
            <div id="todo-error" className="error">
              {error}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default TodoForm;
