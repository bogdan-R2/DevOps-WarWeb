import React, { isValidElement, useEffect, useState } from "react";
import {Grid, Item} from "@mui/material"

import { useNavigate } from "react-router";
import { Modal } from "react-bootstrap";
import EditRequest from "./EditRequest";
import axios from "axios";
import "./Request.scss";
import image from '../../assets/img/request-logo.jpg';
import "./Camp.scss";

const Camp = (props) => {

    const [error, setError] = useState("");
    const [isOwner, setIsOwner] = useState(false);
    const [showFormEditRequest, setShowFormEditRequest] = useState(false);

    const handleShowFormEditRequest = () => setShowFormEditRequest(true);
    const handleCloseFormEditRequest = () => setShowFormEditRequest(false);
    const [allUsers, setAllUsers] = useState([]);
    const [deletedRequest, setDeletedRequest] = useState({});
    const [owner, setOwner] = useState();
    const [isDeleted, setIsDeleted] = useState("false");

 

  const handleDeleteRequest = async () => {
       // props.handleDelete();
    await axios.delete(`http://127.0.0.1:5000/api/request/delete/${props.userRequest._id}`)
    .then((response) => {
    console.log("request deleted neew dis " + response.data.data);
            const deleted = response.data.data;
            const del = response.data.status;
            console.log("del is " + del);
            setDeletedRequest(deleted);
            setIsDeleted(del);
            window.location.reload();

    })
        .catch(error => console.error(`Error: ${error}`));
    }

return(
<>
<div className="card-deck mt-20" style={{ width:'23rem', height:"100%", spacing: '5rem'}}>
 {/*<div className="card text-white bg-primary mb-3" >*/}
 <div className="wrapper">
    <div className="card">
      <div className="card__body">
          <img src={ image } className="card__image" />
          <h2 className="card__title">Type: {props.userRequest.requestType}</h2>
          <h3 className="card__title">Category: {props.userRequest.category}</h3>
          <p className="card__description">City: {props.userRequest.city}</p>
          <p className="card__description">Phone number: {props.userRequest.phoneNumber}</p>
          <p className="card__description">Description of service: {props.userRequest.description}</p>
            <div className="card-text">
            { (props.userData._id === props.userRequest.postedBy) && (
              <>
              {/*    <button className="card__btn">View Recipe</button> */}
                <button className="card__btn1"  onClick={handleShowFormEditRequest} >Edit</button>
                <button className="card__btn2" onClick={handleDeleteRequest}>Delete</button>
              </>
            )}
            </div>
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

export default Camp;