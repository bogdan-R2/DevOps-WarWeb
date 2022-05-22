import React from 'react';
import LandingNav from '../../components/landing-page-nav/LandingNav';

const Contact = () => {
  return (
      <>
      <LandingNav/>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh'
      }}
    >
      <h1>Contact Us</h1>
    </div>
    </>
  );
};

export default Contact;