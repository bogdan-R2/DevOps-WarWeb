import React from "react";
import {Container, Navbar, Nav} from 'react-bootstrap'
import './heabdar.css'
import logo from '../../assets/img/dove.svg';
import { useNavigate } from "react-router";


const [error, setError] = useState("");
const navigate = useNavigate();


async function handleLogout() {
  setError("");

  try {
    await logout();
    navigate("/login");
  } catch (err) {
    console.log(err);
    setError("Failed to log out.");
  }
}




const Headbar = () => {
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