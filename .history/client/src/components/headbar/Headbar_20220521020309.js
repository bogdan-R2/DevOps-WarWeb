import React,  {useState}from "react";
import {Container, Navbar, Nav} from 'react-bootstrap'
import './heabdar.css'
import logo from '../../assets/img/dove.svg';
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";


const Headbar = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();



async function handleLogout() {
  setError("");

  await auth.signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
    console.log(error);
    setError("Failed to log out.");
  });
}
    return(
        <>
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand> <img
          alt=""
          src = { logo }
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        WarWeb</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <Nav.Button onClick={handleLogout}>Log Out</Nav.Button>

        </Nav>
      </Navbar>
      </>
      );
};

export default Headbar;