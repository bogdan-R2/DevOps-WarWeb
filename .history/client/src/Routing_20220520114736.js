import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { FetchProvider } from "./contexts/FetchContext";
import HomePage from "./pages/home/HomePage";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import RequestList from "./components/requests/RequestList"
import OfferList from "./components/offers/OfferList"
import axios from "axios";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

const Routing = (props) => {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        getCurrentUser();
    }, []);
    
    const getCurrentUser = () => {
        axios.get("http://127.0.0.1:5000/api/users", 
        {params: {email: props.userMail}})
        .then((response) => {
            const currUser = response.data;
            setCurrentUser(allRequests);
        })
        .catch(error => console.error(`Error: ${error}`));
    }
    



    return (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage />}/>
                <Route exact path="/signup" element={<Signup/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path="/all-requests" element={<RequestList/>}/>
                <Route exact path="/all-offers" element={<OfferList/>}/>

            </Routes>
        </Router>
        
    );
};

export default Routing;