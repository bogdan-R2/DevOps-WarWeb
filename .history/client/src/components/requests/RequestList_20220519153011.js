import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Request from "./Request";
import {Grid} from "@mui/material"
import { useFetch } from "../../contexts/FetchContext";
import { getAuth } from "firebase/auth";


const RequestList = () => {

    const [error, setError] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [userData, setUserData] = useState({});
    const {fetchAllRequests, fetchUserByEmail} = useFetch();
/*
    const [userEmail, setUserEmail] = useState({})
  
    useEffect (() => { 
        setUserEmail(getAuth().currentUser.email);
        console.log(userEmail);
    }, [])
    

    useEffect (() => { 
      const setAsyncUserData = async () => {
        try {
            // Initially, userType.value is set {}
            const user = await fetchUserByEmail(userEmail);
            console.log("what is this " + user);
            setUserData(user);
        } catch (err) {
            console.log(err);
            throw new Error(err);
        }
    };

    setAsyncUserData();
  }, [])
*/

useEffect (() => { 
    const setAsyncRequestsData = async () => {
      try {
          // Initially, userType.value is set {}
          const user = await fetchUserByEmail(userEmail);
          console.log("what is this " + user);
          setUserData(user);
      } catch (err) {
          console.log(err);
          throw new Error(err);
      }
  };

  setAsyncUserData();
}, [])

return(
    <Grid container spacing={3}>
    {requestList.map(request => (
        <Request 
        userData={userData}
        userRequest = {request}
        />
    ))}

    </Grid>
    );
};

export default RequestList;