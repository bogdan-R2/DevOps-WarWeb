import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Request from "./Request";
import {Grid, ListItem} from "@mui/material"
import { useFetch } from "../../contexts/FetchContext";
import { getAuth } from "firebase/auth";
import axios from 'axios';
import Header from "../header/Header";
import Headbar from "../headbar/Headbar";
import './RequestList.css'
import { Navbar, Dropdown } from "react-bootstrap";


const RequestList = (props) => {

    const [error, setError] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
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
    const categories = ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products', 'All Requests'];
    const [selectedCategory, setSelectedCategory] = useState("Category");



const handleSelectCategory = (e) => {
  setSelectedCategory(e);
};


useEffect(() => {
    getAllRequests();
    //getCurrentUser();
}, [selectedCategory]);

useEffect(() => {
    //getAllRequests();
    getCurrentUser();
}, [props.currUserEmail]);

const getAllRequests = async () => {
    console.log("selected category " + selectedCategory);
    ///request/by-category/:category

    if(selectedCategory === 'All Requests' || selectedCategory === 'Category') {
        await axios.get(`http://127.0.0.1:5000/api/request`)
        .then((response) => {
            const allRequests = response.data.data;
            setLoading(true);
            setRequestList(allRequests);        
        })
        .catch((error) =>{ 
            console.error(`Error: ${error}`);
            setError(error);
            setLoading(true);
        });
    } else {
        await axios.get(`http://127.0.0.1:5000/api/request/by-category/${selectedCategory}`)
        .then((response) => {
            const allRequests = response.data.data;
            setLoading(true);
            setRequestList(allRequests);        
        })
        .catch((error) =>{ 
            console.error(`Error: ${error}`);
            setError(error);
            setLoading(true);
        });
    
    }
}

const getCurrentUser = async () => {
    if(props.currUserEmail !== undefined) {
    await axios.get(`http://127.0.0.1:5000/api/users/${props.currUserEmail}`)
    .then((response) => {
        const allRequests = response.data.data;
        setLoading(true);
        setUserData(allRequests);
    })
    .catch((error) => 
    {
        console.error(`Error: ${error}`);
        setError(error);
        setLoading(true);
        
    });
    
}}



return(
    <>
    {requestList &&  userData && loading &&(
        <>
     <Headbar userData={userData}/> 
     <br></br>
     <div className="input-category">
     <p> Please select a category</p>
     <Dropdown
        title={selectedCategory}
        id="dropdown-menu-align-right"
        onSelect={handleSelectCategory}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedCategory}
            </Dropdown.Toggle>
              <Dropdown.Menu>
             {categories.map((category) => (
                <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>
              ))}
              </Dropdown.Menu>
          </Dropdown>
          </div>
    <Grid className="container" container margin={3} padding={5} spacing={10}>
        
    {
        requestList.map(request => (
        <Grid key={request._id}>
        <Request 
        userRequest = {request}
        userData={userData}
        />
        </Grid>
    ))}

    </Grid>
    </>
    )}

    </>
    );
};

export default RequestList;