import React, {useState, useRef, useEffect} from 'react'
import axios from "axios"
import firebase from "firebase/compat/app"

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Container } from 'react-bootstrap';
//import { auth } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";

import styles from './Signup.css'

// http://127.0.0.1:5000"
const API = process.env.REACT_APP_API;
//const API = "http://127.0.0.1:5000"
const Signup = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        console.log("sending");
        console.log(API);
        console.log(email);
        console.log(password);
        setErrorMessage("");
               
        createUserWithEmailAndPassword(auth, email, password);
       
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/api/user',
            data: {
                email: email, 
                fullName: fullName,
                city: city,
                country: country
         }
        }).then((response) => {
                    console.log(response);
                    console.log('ajungem in post?');
                    navigate("/");
                  }, (error) => {
                    console.log(error);
                  })
        .catch((err) => {
            if (err.response) {
                console.log(error.response.data.message);
            }
        })          
    }

return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
    <form className="signupform" onSubmit={handleSubmit} style={styles}>
    <fieldset>
      <legend>Legend</legend>
      <div className="form-group row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
        <div className="col-sm-10">
          <input type="text" readOnly className="form-control-plaintext" id="staticEmail" defaultValue="email@example.com" />
          
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1" className="form-label mt-4">Email address</label>
        <input type="email" 
        onChange={e => setEmail(e.target.value)} 
        value={email}
        className="form-control" id="exampleInputEmail1"  placeholder="Enter email" autoFocus/>
    </div>
    <span className="text-danger">{errorMessage}</span>



    <div className="form-group">
        <label htmlFor="exampleInputPassword" className="form-label mt-4">Password</label>
        <input type="text" 
        onChange={e => setPassword(e.target.value)} 
        value={password}
        className="form-control" id="inputName" placeholder="Enter password" autoFocus/>
    </div>    
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
     
        <div className="form-group">
        <label d="inputName" className="form-label mt-4">Name</label>
        <input type="text" 
        onChange={e => setFullName(e.target.value)} 
        value={fullName}
        className="form-control" id="inputName" placeholder="Enter complete name" />
      </div>

      
      <div className="form-group">
        <label htmlFor="exampleInputCountry" className="form-label mt-4">Country</label>
        <input type="text" 
        onChange={e => setCountry(e.target.value)} 
        value={country}
        className="form-control" id="exampleInputCountry" placeholder="Enter country" autoFocus/>
      </div>
     

      <div className="form-group">
        <label htmlFor="exampleInputPassword1" className="form-label mt-4">City</label>
        <input type="text" 
        onChange={e => setCity(e.target.value)} 
        value={city}
        className="form-control" id="exampleInputPassword1" placeholder="Enter country" autoFocus/>
      </div>

     
      <button type="submit" className="btn btn-primary">Submit</button>
    </fieldset>
  </form>
  </Container>

    );

    
}

export default Signup