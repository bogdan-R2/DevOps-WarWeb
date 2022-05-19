import axios from "axios";
import React, { useContext } from "react";
import { database } from "../firebase";

const FetchContext = React.createContext();

export function useFetch() {
  return useContext(FetchContext);
}


async function fetchAllRequests() {
    try {
        const requests = [];
        requests = await axios.get("localhost:5000/api/request");
    } catch (error) {
        throw new Error(error);
    }

}

const value = {
  };

export function FetchProvider({ children }) {
  

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
}
