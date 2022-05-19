import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Request from "./Request";
import {Grid, ListItem} from "@mui/material"
import { useFetch } from "../../contexts/FetchContext";
import { getAuth } from "firebase/auth";
import axios from 'axios';

const RequestList = () => {

    const [error, setError] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({value: [], isFetching:false});
   // const {fetchAllRequests, fetchUserByEmail} = useFetch();
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
/*
useEffect (() => { 
    const setAsyncRequestsData = async () => {
      try {
          // Initially, userType.value is set {}
          const requests = await fetchAllRequests();
          console.log("what is this " + requests);
          console.log("first in his name" +requests[0].city )
          setRequestList(requests);
          console.log("dar requestlist cat e " + requestList.value);
      } catch (err) {
        setRequestList({value: requestList.value, isFetching: false});
          console.log(err);
          throw new Error(err);
      }
  };

  setAsyncRequestsData();
}, [])
*/

useEffect(() => {
    getAllRequests();
}, []);

const getAllRequests = () => {
    axios.get("http://127.0.0.1:5000/api/request")
    .then((response) => {
        const allRequests = response.data.data;
        setRequestList(allRequests);
    })
    .catch(error => console.error(`Error: ${error}`));
}


//console.log(requestList[0].city)
if(loading) {
    return <h1>Loading Data.........</h1>
}
if(!loading) {
return(
    <>
    {/*{!requestList.isFetching  && (*/}
    
    <Grid container margin={5} padding={10} spacing={3}>
        
    {requestList.map(request => (
        <ul key={request._id}>
        <Request 
        userRequest = {request}
        />
        </ul>
    ))}

    </Grid>
    </>
    );
} };

export default RequestList;