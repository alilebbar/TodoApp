import { createContext, useContext } from "react";
import { useState } from "react";
import SnackBar from "./SnackBar";

export const SnackBarContext = createContext({});

export const SnackBarProvider = ({ children }) => {
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [messageSnackBar, setMessageSnackBar] = useState("");
  function openSnack(message) {
    setMessageSnackBar(message);
    setOpenSnackBar(true);
    setTimeout(() => {
      setOpenSnackBar(false);
    }, 2000);
  }
  return (
    <SnackBarContext.Provider value={{ openSnack }}>
      <SnackBar open={openSnackBar} message={messageSnackBar} />
      {children}
    </SnackBarContext.Provider>
  );
};
export const useSnackBarContext = () => {
  return useContext(SnackBarContext);
};
