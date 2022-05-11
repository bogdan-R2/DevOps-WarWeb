import React, {useState, useRef, useEffect} from 'react'
import axios from "axios"
import firebase from "firebase/compat/app"

import { getAuth, createUserWithEmailAndPassword, getRedirectResult } from "firebase/auth";

import { Alert, Container, Card } from 'react-bootstrap';
//import { auth } from '../../firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from "react-router-dom";

import './Signup.css'

const API = process.env.REACT_APP_API;
const Signup = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const auth = getAuth();
    const navigate = useNavigate();
    


    async function geExistingUser() {
      try {
        const response = await axios.get("/user_login/john1904");
        setUser(response);
        console.log(response);
      }
      catch (error) {
        console.log(error);
      }
    }

    async function handleSubmit() {
        console.log("sending");
        setError("");

        try {
          const response = await axios.get(`/user_login/${email}`);
          console.log(response);
          if(response != null) {

          }
      } catch (error) {
        console.log(error);
      }


        getAuth()
        .getUserByEmail(email)
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
        });
            
        setUser(getAuth().getUserByEmail(email));
        console.log(user.email)   
        createUserWithEmailAndPassword(auth, email, password)
       .then (() => {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000/api/user',
            data: {
                email: email, 
                fullName: fullName,
                city: city,
                country: country
         }
        }).then(function (response) {
                    console.log(response);
                    console.log('ajungem in post?');
                    navigate("/home");
                  }, (error) => {
                      setError(error);
                    throw new Error(error);
                  })
        .catch((err) => {
            if (err.response) {
                console.log(error.response.data.message);
                throw new Error(err);
            }
        }).catch((error) => {
            if (error.response) {
                console.log(error.response.data.message);
                throw new Error(error);
            }
        }) 
       }).((catch(error) => {
           console.log(error.message)
          setError(error.message)
          throw new Error(error);
       });
                 
    }

return (
  
    <div className="w-100" style={{ maxWidth: "400px" }}>

    <form className="signupform" onSubmit={handleSubmit}>
    
    {error && <Alert variant="danger" >{error}</Alert>}
 
    <fieldset className='filedsets'>
      <h4>Register here</h4>
      <div className="form-group row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label"></label>
        <div className="col-sm-10">
          <input type="text" readOnly className="form-control-plaintext mt-2" id="staticEmail" defaultValue="email@example.com" />
          
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1" className="form-label mt-4 md-2">Email address</label>
        <input type="email" 
        onChange={e => setEmail(e.target.value)} 
        value={email}
        className="form-control" id="exampleInputEmail1"  placeholder="Enter email" autoFocus/>
    </div>
    <div className="form-group">
        <label htmlFor="exampleInputPassword" className="form-label mt-4">Password</label>
        <input type="text" 
        onChange={e => setPassword(e.target.value)} 
        value={password}
        className="form-control" id="inputName" placeholder="Enter password" autoFocus/>
    </div>    
    
     
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

     
      <button type="submit" className="btn btn-primary mt-4">Submit</button>
    </fieldset>
    <div className="w-100 text-center mt-2">
          Already have an account? <Link to="/login">Log In</Link>
        </div>
  </form>
  
</div>

    );

    
}

export default Signup