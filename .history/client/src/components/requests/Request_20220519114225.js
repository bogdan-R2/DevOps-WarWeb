import React from "react";
import { useNavigate } from "react-router";


const Request = ({userData, requestData}) => {

    const [error, setError] = useState("");


return(
<>
<div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
  <div class="card-header">Header</div>
  <div class="card-body">
    <h3 class="card-title">{requestData.category}</h3>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>

</>
    );
};