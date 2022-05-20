import "./header.css";
import "./HeaderStyling.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { getAuth} from "firebase/auth";
import {Navbar, Container, Button} from 'react-bootstrap'
import { Link, Navigate } from "react-router-dom";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import logo from '../../assets/img/dove.svg';
import axios from "axios";

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


  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState({value: {}, isFetching: false});
  const [currentUser, setCurrentUser] = useState({value: {}, isFetching: false});
  const [user, loading, error] = useAuthState(auth);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSeeRequests() {

  }

  return(
<>
 {/*{ userEmail.value && (*/}
  <Navbar bg="dark"  style={customStyles}>
      <Navbar.Brand href="/home">
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
     <Button type="button" className="btn btn-primary ml-2 mr-2">
          See all requests
     </Button>
     </Link>

     <Link to="/all-offers">
     <button type="button" className="btn btn-primary ml-2 mr-2 ">
          See all offers
     </button>
     </Link>

     {userData && <Link to="/profile" ><button type="button" className="btn btn-primary ml-2 mr-2 ">
          My Profile
     </button></Link>}
    {!userData && <Link to='/login'>log-in</Link>}
    <Navbar.Toggle />

        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            title={userData.firstName + " " + userData.lastName}
            id="navbarScrollingDropdown"
          ></NavDropdown>
  
  </Navbar>
{/*)}*/}

</>
    );
};

export default Header;