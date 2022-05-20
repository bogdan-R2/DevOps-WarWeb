import React from "react";
import Headbar from "../../components/headbar/Headbar";
import Sidemenu from "../../components/sidemenu/Sidemenu";
import Widgets from "../../components/widgets/Widgets";
import Feed from "../../components/feed/Feed";
import Header from "../../components/header/Header";
//import { useFetch } from "../../contexts/FetchContext";
import { useState, useEffect } from "react";
import { getAuth} from "firebase/auth";
import { useFetch } from '../../contexts/FetchContext';
import axios from "axios";
import { checkPropTypes } from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";

const HomePage = (props) => {
    


    console.log("home page " + props.currUserEmail);
    
    const [currentUser, setCurrentUser] = useState({value: {}, isFetching: false});
    const emailValue = props.currUserEmail;
    console.log("email value " + emailValue);
    useEffect (() => { 
    const setAsyncUser = async () => {
        try {
          //setUserEmail(getAuth().currentUser.email);
          //setUserEmail(getAuth().currentUser.email);
          setCurrentUser({value: currentUser.value, isFetching: true})
          //const userEmailValue = getAuth().currentUser.email;
             if(!emailValue ) {
                setCurrentUser({value: {}, isFetching: false}); 

             }

             else 
             {

                const userValue = await axios.get("http://127.0.0.1:5000/api/users/", 
                { params: { email: emailValue } });
                console.log("email is " + emailValue)
                console.log("user" + userValue.data.data);   
                setCurrentUser({value: userValue, isFetching: false}); 

             }
             
  
        } catch(error) {
          setCurrentUser({value: {}, isFetching: false})
          throw new Error(error);
        }
      
      }
  
      setAsyncUser();
  }, [emailValue]);


    return (
    <>
            <div className="flex justify-center px12 bg-black/5 w-full min-w-fit">
                <div className="flex w-full py-2 max-w-[1280px]">
                <Header/>
                <Feed/>
                <Widgets/>
                </div>
            </div>
    </>

    )
};

export default HomePage;