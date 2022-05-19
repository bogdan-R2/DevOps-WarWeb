import React from "react";
import { useNavigate } from "react-router";


const RequestList = (requestList) => {

    const [error, setError] = useState("");
    

return(
<>
<div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
  <h2 class="card-title">{requestData.requestType}</h2>
    <h3 class="card-title">{requestData.category}</h3>
    <p class="card-text">{requestData.city}</p>
    <p class="card-text">{requestData.phoneNumber}</p>
    <p class="card-text">{requestData.description}</p>

  </div>
</div>

</>
    );
};

export default RequestList;