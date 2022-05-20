import React, { useState } from "react";
import {Grid, Item} from "@mui/material"

import { useNavigate } from "react-router";


const Request = (props) => {

    const [error, setError] = useState("");
    const [owner, setOwner] = useState("");


return(
<>
<div className="card" style={{width:'23rem', height:'16rem', spacing: '3rem'}}>

<div className="card text-white bg-primary mb-3" >
  <div className="card-header">Owner: {props.userData.email}</div>
  <div className="card-body">
  <h2 className="card-title">Type: {props.userRequest.requestType}</h2>
    <h3 className="card-title">Category: {props.userRequest.category}</h3>
    <p className="card-text">City: {props.userRequest.city}</p>
    <p className="card-text">Phone number: {props.userRequest.phoneNumber}</p>
    <p className="card-text">Description of service: {props.userRequest.description}</p>
    <button class="btn btn-primary" style="margin-left: 1em">Edit</button>
  </div>
</div>
</div>
</>
    );
};

export default Request;