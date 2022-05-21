import React, { useState, useEffect } from "react";
import { Container, Navbar, NavDropdown, Button } from "react-bootstrap";
import {Grid, ListItem} from "@mui/material"

import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Request from "../requests/Request";

const ProfileComponent = ({userData }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(false);

useEffect(() => {
  getUsersRequests();
}, []);

const getUsersRequests = () => {
  if(userData._id !== undefined) {
  axios.get(`http://127.0.0.1:5000/api/request/${userData._id}`)
  .then((response) => {
      const allRequests = response.data.data;
      setRequestList(allRequests);
  })
  .catch(error => console.error(`Error: ${error}`));
  }
}


  return (
      <>
      <div className="card-deck mt-20 ml-15" style={{ width:'23rem', height:"100%", spacing: '3rem'}}>
    <Card className="text-center" >
      <Card.Header>Contact information</Card.Header>
      <Card.Body>
        <Card.Title>
          {userData.fullName}
        </Card.Title>
        <Card.Text style={{ textAlign: "left" }}>
            
              <p>
                <>
                   <b>Name:</b> {userData.fullName}
                </>
              </p>
              <p>
                  <>
                <b>City:</b> {userData.city}
                </>
              </p>
              <p>
                  <>
                <b>Country:</b> {userData.country}
                </>
              </p>
              <p>
                  <>
                <b>Email:</b> {userData.email}
                </>
              </p>
            
        </Card.Text>
      </Card.Body>
    </Card>
    </div>
        <Grid className="container" container margin={3} padding={5} spacing={10}>
            
        {requestList.map(request => (
            <Grid key={request._id}>
            <Request 
            userRequest = {request}
            userData={userData}
            />
            </Grid>
        ))}

        </Grid>
        </>
  );
};

export default ProfileComponent;
