
import React, {useState, useEffect} from "react";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Navigate } from "react-router-dom";



const  GlobalUserEmail = () => {
const [userEmail, setUserEmail] = useState({value: {}, isFetching: false});
const [user, loading, error] = useAuthState(auth);



useEffect (() => { 
    if(loading) return;
    if(!user) return Navigate("/");
const setAsyncUserEmail = async () => {
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
  
  }

  setAsyncUserEmail();
}, [user, loading]);
}
export default GlobalUserEmail;