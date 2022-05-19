import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { FetchProvider } from "./contexts/FetchContext";
import HomePage from "./pages/home/HomePage";
import LandingPage from "./pages/landingPage/LandingPage";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import RequestList from "./components/requests/RequestList"



const Routing = () => {

    const [userEmail, setUserEmail] = useState({})
  
    useEffect (() => { 
      setUserEmail(getAuth().currentUser.email)
      console.log(userEmail)
  }, [])
    return (
        <FetchProvider>
        <Router>
            <Routes>
                <Route path="/home" element={<HomePage/>}/>
                <Route exact path="/signup" element={<Signup/>}/>
                <Route exact path="/login" element={<Login/>}/>
                <Route exact path="/" element={<LandingPage/>}/>
                <Route exact path="/all-requests" element={<RequestList/>}/>
            </Routes>
        </Router>
        </FetchProvider>
    );
};

export default Routing;