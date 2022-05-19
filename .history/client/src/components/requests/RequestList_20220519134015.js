import React, {useState} from "react";
import { useNavigate } from "react-router";
import Request from "./Request";
import {Grid} from "@mui/material"

const RequestList = () => {

    const [error, setError] = useState("");
    const [requestList, setRequestList] = useState([]);
    const [userData, setUserData] = useState({});
    

return(
    <Grid container spacing={3}>
    {requestList.map(request => (
        <Request 
        userData={userData}
        userRequest = {request}
        />
    ))}

    </Grid>
    );
};

export default RequestList;