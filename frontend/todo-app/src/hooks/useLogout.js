import { useIAMContext } from "./useIAMContext";
import { useTodosContext } from "./useTodosContext";

export const useLogout = () => {
  const { dispatch } = useIAMContext();
  const { dispatch: todosDispatch } = useTodosContext();

  const logout = () => {
    // remove user from localStorage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    todosDispatch({ type: "SET_TODOS", payload: null });
  };
  return { logout };
};
