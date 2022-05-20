import React, { useCallback } from "react";
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
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";

const Routing = () => {
    const [user, loading, error] = useAuthState(auth);
    
    const [userEmail, setUserEmail] = useState({value: {}, isFetching: false});


    const setAsyncUserEmail = useCallback(() => {
      try {
        //setUserEmail(getAuth().currentUser.email);
        //setUserEmail(getAuth().currentUser.email);
        setUserEmail({value: userEmail.value, isFetching: true})
        //const userEmailValue = getAuth().currentUser.email;
        const userEmailValue = user.email;
        if(!userEmail) {
          setUserEmail({value: {}, isFetching: false})
        }else 
          setUserEmail({value: userEmailValue, isFetching: false})

      } catch(error) {
        setUserEmail({value: {}, isFetching: false})
        throw new Error(error);
      }
    
    },[])

    useEffect (() => { 
        if(loading) return;
        //if(!user) Navigate("/");
  
      setAsyncUserEmail();
  }, [user, loading]);

    return (
        <>
        {userEmail.value && (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage currUserEmail={userEmail.value} />}/>
                <Route exact path="/signup" element={<Signup/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path="/all-requests" element={<RequestList/>}/>
                <Route exact path="/all-offers" element={<OfferList/>}/>

            </Routes>
        </Router>
        )};
        </>
    );
};

export default Routing;