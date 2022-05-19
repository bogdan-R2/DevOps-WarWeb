import React from "react";
import { useNavigate } from "react-router";
import Request from "./Request";
import {Grid} from "@mui/material"

const RequestList = ({userData, requestList}) => {

    const [error, setError] = useState("");
    

return(
    <Grid container>
    {requestList.map(request => (
        <Request 
        userData={userData}
        userRequest = {request}
        />
    ))}

    <Grid/>
    );
};

export default RequestList;