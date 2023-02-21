import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error("Error using TodosContext");
  }
  return context;
};
