import "./header.css";
import "./HeaderStyling.css";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { getAuth} from "firebase/auth";
import {Navbar, Container, Button} from 'react-bootstrap'

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

const Header = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState({})
  
  useEffect (() => { 
    setUserEmail(getAuth().currentUser.email)
    console.log(userEmail)
}, {})
  

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return(
<>
  <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{' '}
        WarWeb
      </Navbar.Brand>
    </Container>
  </Navbar>
  <button type="button"
  class="btn btn-primary"
  >{userEmail}</button>

</>
    );
};

export default Header;