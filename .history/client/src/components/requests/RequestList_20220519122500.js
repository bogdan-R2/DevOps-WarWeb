import React from "react";
import { useNavigate } from "react-router";
import Request from "./Request";

const RequestList = ({requestList}) => {

    const [error, setError] = useState("");
    

return(
    <>
    {requestList.map(request => (
        
    ))}

    </>
    );
};

export default RequestList;