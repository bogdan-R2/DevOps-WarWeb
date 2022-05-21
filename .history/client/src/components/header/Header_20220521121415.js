import "./header.css";
import "./HeaderStyling.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { getAuth} from "firebase/auth";
import {Navbar, Container, Button, NavDropdown} from 'react-bootstrap'
import { Link, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from '../../assets/img/dove.svg';
import axios from "axios";
import { useNavigate } from "react-router";




const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const Header = ({userData}) => {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState({value: {}, isFetching: false});
  const [currentUser, setCurrentUser] = useState({value: {}, isFetching: false});
  const [user, loading, error] = useAuthState(auth);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  async function handleLogout() {
    setErrorMessage("");
  
    await auth.signOut().then(function() {
      // Sign-out successful.
      navigate("/");
    }, function(error) {
      // An error happened.
      console.log(error);
      setErrorMessage("Failed to log out.");
    });
  }



  return(
<>
 {/*{ userEmail.value && (*/}
  <Navbar bg="dark" variant="dark" style={customStyles}>
      <Navbar.Brand href="/home"
      >
        <img
          alt=""
          src = { logo }
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        WarWeb
        {currentUser.value._id}
      </Navbar.Brand>
      <Link to="/all-requests">
     <Button type="button" className="btn btn-primary ml-2 mr-2 ">
          See all requests
     </Button>
     </Link>

     <Link to="/all-offers">
     <button type="button" className="btn btn-primary ml-2 mr-2 ">
          See all offers
     </button>
     </Link>
     <Button color="#ff5c5c" title="I'm a button!">
       test
     </Button>
    <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            title={userData.email}
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
          </NavDropdown>
          </Navbar.Collapse>

  </Navbar>
{/*)}*/}

</>
    );
};

export default Header;