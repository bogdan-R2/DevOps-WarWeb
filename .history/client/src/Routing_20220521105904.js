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
import Profile from "./pages/profile/Profile";
import ReactLoading from "react-loading";



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
        } else if(userEmail!== null)
         {
         setUserEmail({value: userEmailValue, isFetching: false})
         
        }

      } catch(error) {
        setUserEmail({value: {}, isFetching: false})
        throw new Error(error);
      }
    
    },[user, loading])

    useEffect (() => { 
      if(loading) return;
      setTimeout(() => {
        setAsyncUserEmail();
      }, 100);
  }, [setAsyncUserEmail]);
// add timeout unde face use effect figuri
    return (
        <>
        {userEmail.value && (
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage currUserEmail={userEmail.value} />}/>
                <Route exact path="/signup" element={<Signup/>}/>
                <Route exact path="/profile" element={<Profile currUserEmail={userEmail.value} />}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path="/all-requests" element={<RequestList currUserEmail={userEmail.value}/>}/>
                <Route exact path="/all-offers" element={<OfferList currUserEmail={userEmail.value}/>}/>

            </Routes>
        </Router>
        )};
        </>
    );
};

export default Routing;