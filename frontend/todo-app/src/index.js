import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { IAMContextProvider } from "./context/IAMContext";
import { TodosContextProvider } from "./context/TodoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IAMContextProvider>
      <TodosContextProvider>
        <App />
      </TodosContextProvider>
    </IAMContextProvider>
  </React.StrictMode>
);
