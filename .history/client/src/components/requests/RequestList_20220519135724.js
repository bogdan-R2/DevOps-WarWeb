import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Request from "./Request";
import {Grid} from "@mui/material"
import { useFetch } from "../../contexts/FetchContext";
import { getAuth } from "firebase/auth";


const RequestList = (loggedUserEmail) => {

    const [error, setError] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [userData, setUserData] = useState({});
    const {fetchAllRequests, fetchUserByEmail} = useFetch();

    const [userEmail, setUserEmail] = useState({})
  
    useEffect (() => { 
      const setAsyncUserData = () => {
        try {
            // Initially, userType.value is set {}
            const user = fetchUserByEmail(loggedUserEmail);
            console.log(user);
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