import { positions } from '@mui/system';
import React from 'react';
import { Row } from 'react-bootstrap';
import LandingNav from '../../components/landing-page-nav/LandingNav';
import './Contact.css';


const Contact = () => {
  return (
      <>
      <LandingNav/>
      <div class="box">
        <div>
            <h2>
                Contact Us
            </h2>
        </div>
        <div>
            <p>
                <b>Address: Splaiul Independenței 313</b> sdsd
            </p>
        </div>
        <div>
            <p>
                <b>Number:  (+40)021 402 9100</b>
            </p>
        </div>

        <div>
            <p>
                <b>We are available 24/7</b>
            </p>
        </div>

    </div>
      
    </>
  );
};

export default Contact;