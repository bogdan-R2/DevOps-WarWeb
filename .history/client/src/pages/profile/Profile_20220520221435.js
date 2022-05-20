import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCallback } from 'react';


const Profile = (props) => {

    console.log("profile page" + props.currUserEmail);
    // todo add error messages
    const [currentUser, setCurrentUser] = useState({value: {}, isFetching: false});
    const emailValue = props.currUserEmail;
    const [showFormEnroll, setShowFormEnroll] = useState(false);

    const handleShowFormEnroll = () => setShowFormEnroll(true);
  	const handleCloseFormEnroll = () => setShowFormEnroll(false);

    const setAsyncUser = useCallback(async () => {
      try {
        //setUserEmail(getAuth().currentUser.email);
        //setUserEmail(getAuth().currentUser.email);
        setCurrentUser({value: {}, isFetching: true})
        //const userEmailValue = getAuth().currentUser.email;
        console.log("email value in fetch" + emailValue );   
        const userValue = await axios.get(`http://127.0.0.1:5000/api/users/${emailValue}`);

        if(!emailValue && userValue.data.data === null ) {
              setCurrentUser({value: {}, isFetching: true}); 
              // a fost false
           }
           else 
           {
              console.log("email value in else "+ emailValue );
              console.log("email is " + emailValue)
              if(userValue.data.data !== null)
              {
                  setCurrentUser({value: userValue.data.data, isFetching: false}); 
              }
           }
           

      } catch(error) {
        setCurrentUser({value: {}, isFetching: false})
        throw new Error(error);
      }
    
    }, [emailValue])
    useEffect (() => { 
      setAsyncUser();
  }, [setAsyncUser]);
	
};

export default Profile;
