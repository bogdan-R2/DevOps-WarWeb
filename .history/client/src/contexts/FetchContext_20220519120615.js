import React, { useContext } from "react";
import { database } from "../firebase";

const FetchContext = React.createContext();

export function useFetch() {
  return useContext(FetchContext);
}

export function FetchProvider({ children }) {
  

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
}
