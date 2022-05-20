import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import Request from "../requests/Request";
import {Grid} from "@mui/material"
import { useFetch } from "../../contexts/FetchContext";
import { getAuth } from "firebase/auth";
import axios from 'axios';
import Headbar from "../headbar/Headbar";
const OfferList = () => {

    const [error, setError] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({value: [], isFetching:false});

useEffect(() => {
    getAllRequests();
}, []);

const getAllRequests = async () => {
    await axios.get("http://127.0.0.1:5000/api/request/offers")
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
    <Headbar>
    </Headbar>
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

export default OfferList;