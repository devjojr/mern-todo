import { createContext, useReducer, useEffect } from "react";

export const IAMContext = createContext();

export const iamReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const IAMContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(iamReducer, {
    user: null,
  });

  // check localStorage for jwt token
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  return (
    <IAMContext.Provider value={{ ...state, dispatch }}>
      {children}
    </IAMContext.Provider>
  );
};
