import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Request from "../requests/Request";
import {Grid} from "@mui/material"
import { useFetch } from "../../contexts/FetchContext";
import { getAuth } from "firebase/auth";
import axios from 'axios';
import Headbar from "../headbar/Headbar";
import Header from "../header/Header";
import { Dropdown } from "react-bootstrap";
import "./OfferList.css";

const OfferList = (props) => {

    const [error, setError] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const categories = ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products', 'All Requests'];
    const [selectedCategory, setSelectedCategory] = useState("Category");



    useEffect(() => {
        getAllRequests();
        //getCurrentUser();
    }, []);
    
    useEffect(() => {
        //getAllRequests();
        getCurrentUser();
    }, [props.currUserEmail]);
    

    const handleSelectCategory = (e) => {
        setSelectedCategory(e.target.value);
      };

      
    const getAllRequests = async () => {
      
        console.log("selected category in offers " + selectedCategory);
        ///request/by-category/:category
    
        if(selectedCategory === 'All Requests' || selectedCategory === 'Category') {
            await axios.get(`http://127.0.0.1:5000/api/request/offers`)
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
            //localhost:5000/api/request/offers/by-category/Medicine
            await axios.get(`http://127.0.0.1:5000/api/request/offers/by-category/${selectedCategory}`)
            .then((response) => {
                console.log(selectedCategory);
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
    

/** 
return(
   { /*
    <>
    {/*{!requestList.isFetching  && (
    {requestList &&  userData && loading && (
        <>   
     <Header userData={userData}/> 
     <br></br>
     <div className="flexbox-container">
     <h2> Select category for offer:</h2>

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
    <div style={{ padding: 20 }}>
    <Grid container margin={5} padding={10} spacing={5}>
    {requestList.map(request => (
        <ul key={request._id}>
        <Request 
        userRequest = {request}
        userData={userData}
        />
     </ul>
    ))}

    </Grid>
    </div>
    </>
    )}

    </>
    <>
    {requestList &&  userData && loading &&(
        <>
     <Header userData={userData}/> 
     <br></br>
     <div className="flexbox-container">
     <h2> Select category for request:</h2>

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
}*/

return(
    <>
    {requestList &&  userData && loading &&(
        <>
     <Header userData={userData}/> 
     <br></br>
     <div className="flexbox-container">
     <h2> Select category for request:</h2>

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


export default OfferList;