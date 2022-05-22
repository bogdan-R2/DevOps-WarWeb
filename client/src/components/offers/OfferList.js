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
    const categories = ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products', 'All Offers'];
    const [selectedCategory, setSelectedCategory] = useState("Category");



    useEffect(() => {
        getAllRequests();
        //getCurrentUser();
    }, [selectedCategory]);
    
    useEffect(() => {
        //getAllRequests();
        getCurrentUser();
    }, [props.currUserEmail]);
    

    const handleSelectCategory = (e) => {
        setSelectedCategory(e);
      };

      
    const getAllRequests = async () => {
      
        console.log("selected category in offers " + selectedCategory);
        ///request/by-category/:category
    
        if(selectedCategory === 'All Offers' || selectedCategory === 'Category') {
            await axios.get(`http://pweb-api:8091/api/request/offers`)
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
            //localhost:8091/api/request/offers/by-category/Medicine
            await axios.get(`http://pweb-api:8091/api/request/offers/by-category/${selectedCategory}`)
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
        await axios.get(`http://pweb-api1:8091/api/users/${props.currUserEmail}`)
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
     <Header userData={userData}/> 
     <br></br>
     <div className="flexbox-container">
     <h3> Select category:</h3>

     <Dropdown
        title={selectedCategory}
        id="dropdown-menu-align-right"
        onSelect={handleSelectCategory}>
            <Dropdown.Toggle className="drop-toggle" id="dropdown-basic">
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