import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Request from "../requests/Request";
import {Grid} from "@mui/material"
import { useFetch } from "../../contexts/FetchContext";
import { getAuth } from "firebase/auth";
import axios from 'axios';
import Headbar from "../headbar/Headbar";

const OfferList = (props) => {

    const [error, setError] = useState("");
    const [requestList, setRequestList] = useState([]);
    //const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getAllRequests();
        //getCurrentUser();
    }, []);
    
    useEffect(() => {
        //getAllRequests();
        getCurrentUser();
    }, [props.currUserEmail]);
    
    const getAllRequests = async () => {
        await axios.get("http://127.0.0.1:5000/api/request/offers")
        .then((response) => {
            const allRequests = response.data.data;
            setRequestList(allRequests);
        })
        .catch(error => console.error(`Error: ${error}`));
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
    <div style={{ padding: 20 }}>
    <Headbar></Headbar>
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