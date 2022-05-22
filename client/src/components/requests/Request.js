import React, { useEffect, useState } from "react";
import {Grid, Item} from "@mui/material"

import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import EditRequest from "./EditRequest";
import axios from "axios";

const Request = (props) => {

    const [error, setError] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [showFormEditRequest, setShowFormEditRequest] = useState(false);

    const handleShowFormEditRequest = () => setShowFormEditRequest(true);
    const handleCloseFormEditRequest = () => setShowFormEditRequest(false);
    const [allUsers, setAllUsers] = useState([]);
 
    const [owner, setOwner] = useState();

    useEffect(() => {
      //getAllRequests();
      findOwner();
  }, [props.userData]);   

  const findOwner = async () => {

        await axios.get(`http://pweb-api:8091/api/users`)
        .then((response) => {
            setAllUsers(response.data.data);
        })
        .catch(error => console.error(`Error: ${error}`));
}

return(
<>
<div className="card-deck mt-20" style={{ width:'23rem', height:"100%", spacing: '3rem'}}>

<div className="card text-white bg-primary mb-3" >
  <div className="card-body">
  <h2 className="card-title">Type: {props.userRequest.requestType}</h2>
    <h3 className="card-title">Category: {props.userRequest.category}</h3>
    <p className="card-text">City: {props.userRequest.city}</p>
    <p className="card-text">Phone number: {props.userRequest.phoneNumber}</p>
    <p className="card-text">Description of service: {props.userRequest.description}</p>
    <div className="card-text">
    { (props.userData._id === props.userRequest.postedBy) && (
      <>
        <button className="btn btn-danger ml-2 mr-3" style={{marginLeft: '1em'}} onClick={handleShowFormEditRequest} >Edit</button>
        <button className="btn btn-danger ml-28 mr-1" style={{marginRight: '1em'}}>Delete</button>
      </>
    )}
    </div>
  </div>
</div>
</div>

<Modal
    show={showFormEditRequest}
    onHide={handleCloseFormEditRequest}
    backdrop="static"
    keyboard={false}
    >
<Modal.Header closeButton>
    </Modal.Header>
    <Modal.Body>
		<EditRequest requestData={props.userRequest} />
		</Modal.Body>
</Modal>
</>
    );
};

export default Request;