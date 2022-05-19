import React, { useContext } from "react";
import { database } from "../firebase";

const FetchContext = React.createContext();

export function useFetch() {
  return useContext(FetchContext);
}


const value = {
  };

export function FetchProvider({ children }) {
  

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
}
