import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router";
import {Grid, ListItem, Box} from "@mui/material"
import axios from 'axios';
import Header from "../header/Header";
import { Navbar, Dropdown } from "react-bootstrap";
import "./CampList.css";
import Camp from "./Camp";

const CampList = (props) => {

    const [error, setError] = useState("");
    const [campList, setCampList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({});
    const categories = ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products', 'All Requests'];
    const [selectedCategory, setSelectedCategory] = useState("Category");
    const [deletedRequest, setDeletedRequest] = useState({});

    useEffect(() => {
        getAllCamps();
        //getCurrentUser();
    }, []);

    useEffect(() => {
        //getAllRequests();
        getCurrentUser();
    }, [props.currUserEmail]);


    const handleSelectCategory = (e) => {
        setSelectedCategory(e);
    };
    
    const handleDelete = async () =>{
        await axios.delete(`http://pweb-api:8091/api/request/delete/${props.userRequest._id}`)
        .then((response) => {
            console.log("request deleted neew dis " + response.data.data);
            const deleted = response.data.data;
            setDeletedRequest(deleted);
        })
        .catch(error => console.error(`Error: ${error}`));
    }

    const getAllCamps= async () => {

        await axios.get(`http://pweb-api:8091/api/camp`)
        .then((response) => {
            const allCamps = response.data.data;
            setLoading(true);
            setCampList(allCamps);        
        })
        .catch((error) =>{ 
            console.error(`Error: ${error}`);
            setError(error);
            setLoading(true);
        });
    
    
    }

const getCurrentUser = async () => {
    if(props.currUserEmail !== undefined) {
    await axios.get(`http://pweb-api:8091/api/users/${props.currUserEmail}`)
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
    {campList &&  userData && loading &&(
        <>
     <Header userData={userData}/> 
     
    <Grid className="container" container margin={3} padding={5} spacing={10}>
        
    {
        campList.map(request => (
            <ul>
        <li  key={request._id}>
        <Camp
        userRequest = {request}
        userData={userData}
        />
        </li>
        </ul>
    ))}

    </Grid>
    </>
    )}

    </>
    );
};

export default CampList;