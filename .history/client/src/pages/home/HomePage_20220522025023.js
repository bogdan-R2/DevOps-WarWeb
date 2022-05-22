import React from "react";
import Header from "../../components/header/Header";
//import { useFetch } from "../../contexts/FetchContext";
import { useState, useEffect } from "react";
import { getAuth} from "firebase/auth";
import { useFetch } from '../../contexts/FetchContext';
import axios from "axios";
import { checkPropTypes } from "prop-types";
import { propTypes } from "react-bootstrap/esm/Image";
import { Card, Modal, Button } from "react-bootstrap";
import AddRequestForm from "../../components/requests/AddRequestForm";
import { useCallback } from "react";
const API = process.env.REACT_APP_API;




const HomePage = (props) => {
    
    console.log("home page " + props.currUserEmail);
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


    return (
    <>
    {!currentUser.isFetching &&(
        <>
           <Header userData={currentUser.value}/>
           <Card key={currentUser.value._id}>
            <Card.Header>
            <Button  variant="dark" onClick={handleShowFormEnroll}>
						<b>Add Request/Offer</b>
					</Button>
            </Card.Header>
            <Card.Body>
              <Modal
              show={showFormEnroll}
              onHide={handleCloseFormEnroll}
              backdrop="static"
              keyboard={false}
            >
                <Modal.Header closeButton>
                  <Modal.Title>Add Request/Offer </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <AddRequestForm userData={currentUser.value} />
                </Modal.Body>
              </Modal>
            </Card.Body>
           </Card>
        
</>
    )}
    </>

    )
};

export default HomePage;