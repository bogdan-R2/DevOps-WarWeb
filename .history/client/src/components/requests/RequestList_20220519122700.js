import React from "react";
import { useNavigate } from "react-router";
import Request from "./Request";

const RequestList = ({userData, requestList}) => {

    const [error, setError] = useState("");
    

return(
    <>
    {requestList.map(request => (
        <Request 
        userData={userData}
        userRequest = {request}
        />
    ))}

    </>
    );
};

export default RequestList;