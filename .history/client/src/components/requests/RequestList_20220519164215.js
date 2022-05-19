import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Request from "./Request";
import {Grid} from "@mui/material"
import { useFetch } from "../../contexts/FetchContext";
import { getAuth } from "firebase/auth";
import axios from 'axios';

const RequestList = () => {

    const [error, setError] = useState("");
    const [requestList, setRequestList] = useState([]);
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
          setRequestList({value: requestList.value, isFetching: true});
          const requests = await fetchAllRequests();
          console.log("what is this " + requests);
          console.log("first in his name" +requests[0].city )
          setRequestList({value: requests, isFetching: false});
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

useEffect (() => { 
    async function getRequests() {
        //let requests = [];
      
          // Initially, userType.value is set {}
          //requests = await fetchAllRequests();
          //console.log("what is this " + requests);
          //console.log("first in his name" +requests[0].city )
          await axios.get("http://127.0.0.1:5000/api/request")
          .then(response => {
              setRequestList(response.data.data);
          });
          console.log("ce e in requests" + requests.data.data[0].city);
          setRequestList(requests.data.data);
          console.log("dar requestlist cat e " + requestList);
      
  };

  getRequests();
}, [])



return(
    <>
    {/*{!requestList.isFetching  && (*/}
    <Grid container spacing={3}>
    {requestList.map(request => (
        <Request 
        userRequest = {request}
        />
    ))}

    </Grid>
    </>
    );
};

export default RequestList;