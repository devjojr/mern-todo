import { useEffect } from "react";
import { useTodosContext } from "../hooks/useTodosContext";
import { useIAMContext } from "../hooks/useIAMContext";

import TodoInfo from "../components/TodoInfo";
import TodoForm from "../components/TodoForm";

const Home = () => {
  // create state
  const { todos, dispatch } = useTodosContext();
  const { user } = useIAMContext();

  useEffect(() => {
    // fetching todo data from API when component renders
    // authorization header for authentication with user token to get todos
    const fetchTodos = async () => {
      const response = await fetch("/api/todos", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      // returns array of todo objects
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };
    if (user) {
      fetchTodos();
    }
  }, [dispatch, user]);

  return (
    <div className="home-page section">
      <div className="columns">
        <div className="column is-4">
          <TodoForm />
        </div>

        <div className="column is-7 is-offset-1">
          <h1 className="title has-text-centered is-capitalized">{user.userName}'s Todos</h1>
          {todos &&
            todos.map((todo) => <TodoInfo key={todo._id} todo={todo} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;
