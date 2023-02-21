import { useContext } from "react";
import { IAMContext } from "../context/IAMContext";

export const useIAMContext = () => {
  const context = useContext(IAMContext);

  if (!context) {
    throw new Error("Error using IAMContext");
  }
  return context;
};
