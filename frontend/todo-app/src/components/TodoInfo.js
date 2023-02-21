import { useIAMContext } from "../hooks/useIAMContext";
import { useTodosContext } from "../hooks/useTodosContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TodoInfo = ({ todo }) => {
  const { user } = useIAMContext();
  const { dispatch } = useTodosContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/todos/" + todo._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: json });
    }
  };
  return (
    <div className="card block">
      <header className="card-header">
        <p className="card-header-title">{todo.title}</p>
      </header>
      <div className="card-content">
        <div className="content">
          <p>{todo.description}</p>
        </div>
      </div>
      <footer className="card-footer">
        <div className="card-footer-item">
          <time>
            {formatDistanceToNow(new Date(todo.createdAt), {
              addSuffix: true,
            })}
          </time>
        </div>
        <div className="card-footer-item">
          <i
            id="trash-delete"
            className="fas fa-trash-can"
            onClick={handleDelete}
          ></i>
        </div>
      </footer>
    </div>
  );
};

export default TodoInfo;
