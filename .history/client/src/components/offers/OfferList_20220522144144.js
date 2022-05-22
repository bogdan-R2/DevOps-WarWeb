import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Request from "../requests/Request";
import {Grid} from "@mui/material"
import { useFetch } from "../../contexts/FetchContext";
import { getAuth } from "firebase/auth";
import axios from 'axios';
import Headbar from "../headbar/Headbar";
import Header from "../header/Header";

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
    
    const getAllRequests = async () => {
       /*
        await axios.get("http://127.0.0.1:5000/api/request/offers")
        .then((response) => {
            const allRequests = response.data.data;
            setRequestList(allRequests);
        })
        .catch(error => console.error(`Error: ${error}`));
        */
        console.log("selected category " + selectedCategory);
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
            await axios.get(`http://127.0.0.1:5000/api/request/offers/by-category/${selectedCategory}`)
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
            setUserData(allRequests);
        })
        .catch(error => console.error(`Error: ${error}`));
    }
    }


return(
    <>
    {/*{!requestList.isFetching  && (*/}
    {requestList &&  userData && (
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
    );
};

export default OfferList;