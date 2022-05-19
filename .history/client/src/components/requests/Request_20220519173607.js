import React, { useState } from "react";

import { useNavigate } from "react-router";


const Request = (props) => {

    const [error, setError] = useState("");
    const [owner, setOwner] = useState("");


return(
<>
<div className="card text-white bg-primary mb-3" style="max-width: 20rem;">
  <div className="card-header">Header</div>
  <div className="card-body">
  <h2 className="card-title">{props.userRequest.requestType}</h2>
    <h3 className="card-title">{props.userRequest.category}</h3>
    <p className="card-text">{props.userRequest.city}</p>
    <p className="card-text">{props.userRequest.phoneNumber}</p>
    <p className="card-text">{props.userRequest.description}</p>

  </div>
</div>

</>
    );
};

export default Request;