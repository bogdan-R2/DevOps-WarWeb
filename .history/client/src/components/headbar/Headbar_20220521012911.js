import React from "react";
import {Container, Navbar, Nav} from 'react-bootstrap'
import './heabdar.css'
const Headbar = () => {
    return(
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
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
        </Nav>
        </Container>
      </Navbar>
      </>
      );
};

export default Headbar;