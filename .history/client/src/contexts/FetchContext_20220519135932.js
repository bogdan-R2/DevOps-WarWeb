import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { database } from "../firebase";




const FetchContext = React.createContext();

export function useFetch() {
  return useContext(FetchContext);
}

export function FetchProvider({ children }) {

  

async function fetchAllRequests() {
    const requests = [];

    try {
        requests = await axios.get("http://127.0.0.1:5000/api/request");
    } catch (error) {
        console.log(error.message);
        throw new Error(error);
    }

    return requests;

}  


async function fetchUserByEmail(email) {
    const user = {};

    try {
        user = await axios.get("localhost:5000/api/users", 
        {
            params: {
                email: email
            }
        });
    } catch (error) {
        throw new Error(error);
    }

    return user;

}



/*

useEffect(() => {
    axios
      .get("localhost:5000/api/request").
      then((response) => {
        setRequests(response); // update your state
      })
      .catch((error) => {
        // handle errors
      });
  }, []);
*/
const value = {
    fetchAllRequests,
    fetchUserByEmail
  };

  return (
    <FetchContext.Provider value={value}>{children}</FetchContext.Provider>
  );
}
