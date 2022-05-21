import React,  {useState} from "react";
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap'
import logo from '../../assets/img/dove.svg';
import { useNavigate } from "react-router";
import { getAuth } from "firebase/auth";
import './heabdar.css'
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const Headbar = ({userData}) => {

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = getAuth();
  const categories = ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products'];
  const [selectedCategory, setSelectedCategory] = useState("Select");


async function handleLogout() {
  setError("");

  await auth.signOut().then(function() {
    // Sign-out successful.
    navigate("/");
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
        </Nav>


        <Navbar.Collapse className="justify-content-end">
          <NavDropdown
            title="Categories"
            id="nav-bar-categories"
          >
            <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
          </NavDropdown>
          </Navbar.Collapse>

    
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

      </>
      );
};

export default Headbar;