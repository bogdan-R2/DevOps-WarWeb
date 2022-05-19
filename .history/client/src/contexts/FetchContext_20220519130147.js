import axios from "axios";
import React, { useContext } from "react";
import requests from "../../../server/api/routes/requests";
import { database } from "../firebase";

const FetchContext = React.createContext();

export function useFetch() {
  return useContext(FetchContext);
}

export function FetchProvider({ children }) {

    const[requests, setRequests] = useState([]);
  
    
async function fetchAllRequests() {
    try {
        const requests = [];
        requests = await axios.get("localhost:5000/api/request");
    } catch (error) {
        throw new Error(error);
    }

    return requests;

}

const value = {
    fetchAllRequests
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
}
