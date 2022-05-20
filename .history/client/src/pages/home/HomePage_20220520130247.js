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

const HomePage = (props) => {
    


    console.log("home page " + props.currUserEmail);
    
    const [currentUser, setCurrentUser] = useState({value: {}, isFetching: false});

    useEffect (() => { 
    const setAsyncUser = async () => {
        try {
          //setUserEmail(getAuth().currentUser.email);
          //setUserEmail(getAuth().currentUser.email);
          setCurrentUser({value: currentUser.value, isFetching: true})
          //const userEmailValue = getAuth().currentUser.email;
          if(props.currUserEmail) {
             const userValue = await axios.get("http://127.0.0.1:5000/api/users/")
             console.log("user" + userValue);
             if(!userValue) {
                setCurrentUser({value: {}, isFetching: true}) 
            }
          }else 
            setCurrentUser({value: {}, isFetching: false})
  
        } catch(error) {
          setCurrentUser({value: {}, isFetching: false})
          throw new Error(error);
        }
      
      }
  
      setAsyncUser();
  }, [props, currentUser ]);


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