import React, {useState, useRef, useEffect} from 'react'
import axios from "axios"
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import './Signup.css'
import LandingNav from '../../components/landing-page-nav/LandingNav';

const API = process.env.REACT_APP_API;


const Signup = () => {

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();
    const auth = getAuth();
    const navigate = useNavigate();
    
    async function postUser() {
      try {
        
        if(fullName !== "" ) {

          axios({
            method: 'post',
            url: `${API}:5000/api/users`,
            data: {
                email: email, 
                fullName: fullName,
                city: city,
                country: country
            }
        }) } }catch (error) {
            
            setErrorMessage(error.message);
            throw new Error(error);
          }
        }
       

    async function handleSubmit() {
        console.log("sending");
        setErrorMessage("");
        createUserWithEmailAndPassword(auth, email, password);
        postUser();
        navigate("/");
                 
    }

return (
  <>
  <LandingNav/>
    <div className="w-100" style={{ maxWidth: "400px" }}>

    <form className="signupform" onSubmit={handleSubmit}>
    <fieldset className='filedsets'>
      <h4>Signup</h4>
      <div className="form-group row">
        <label htmlFor="staticEmail" className="col-sm-2 col-form-label"></label>
        <div className="col-sm-10">
          <input type="text" readOnly className="form-control-plaintext mt-2 mr-24" id="staticEmail" defaultValue="Example: email@example.com" />
          
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
        <input type="password" 
        onChange={e => setPassword(e.target.value)} 
        value={password}
        className="form-control" id="password" placeholder="Enter password" autoFocus/>
    </div>    
    
        <div className="form-group">
        <label htmlFor="exampleInputName" className="form-label mt-4">Name</label>
        <input type="text" 
        onChange={e => setFullName(e.target.value)} 
        value={fullName}
        className="form-control" id="fullName" placeholder="Enter complete name" autoFocus/>
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
</>
    );

    
}

export default Signup