import React from 'react';
import logo from "../../assets/img/dove.svg";
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const LandingNav = () => {
  return (
    <>
      <Nav>
        <NavLink to='/'>
          <img src={logo} alt='logo' />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to='/about' activestyle="true">
            About 
          </NavLink>
          <NavLink to='/contact-us' activestyle="true">
            Contact Us
          </NavLink>
          <NavLink to='/signup' activestyle="true">
            Sign Up
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login'>Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default LandingNav;