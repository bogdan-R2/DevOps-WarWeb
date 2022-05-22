import React, { useState } from "react";

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

return(
<>
<div className="card-deck mt-20" style={{ width:'23rem', height:"100%", spacing: '5rem'}}>
 {/*<div className="card text-white bg-primary mb-3" >*/}
 <div className="wrapper">
    <div className="card">
      <div className="card__body">
          <img src={ image } className="card__image" />
          <h2 className="card__title">Current capacity: {props.userRequest.currentCapacity}</h2>
          <h2 className="card__title">Maximum capacity: {props.userRequest.maxCapacity}</h2>
          <h2 className="card__title">Country: {props.userRequest.country}</h2>
          <p className="card__description">City: {props.userRequest.city}</p>
          <p className="card__description">Phone number: {props.userRequest.phoneNumber}</p>
          <p className="card__description">Description of service: {props.userRequest.description}</p>
       </div>
    </div>
  </div>
</div>
</>
    );
};

export default Camp;