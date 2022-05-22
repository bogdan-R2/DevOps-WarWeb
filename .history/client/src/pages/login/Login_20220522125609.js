import React, {useState} from 'react'


import { Container } from 'react-bootstrap';
//import { auth } from '../../firebase';
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LandingNav from '../../components/landing-page-nav/LandingNav';


// http://127.0.0.1:5000"
const API = process.env.REACT_APP_API;
//const API = "http://127.0.0.1:5000"
const Login = () => {

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [country, setCountry] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
        console.log("sending");
        console.log(email);
        console.log(password);
        setErrorMessage("");       
        const auth = getAuth();
        try{
        signInWithEmailAndPassword(auth, email, password);
        navigate('/home');
        }
        catch(error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        };          
    }

return (
  <>
  <LandingNav/>
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: "500px" }}>
    <form className="signupform" onSubmit={handleSubmit}>
    <fieldset>
      <legend>Login</legend>
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
        <input type="password" 
        onChange={e => setPassword(e.target.value)} 
        value={password}
        className="form-control" id="inputName" placeholder="Enter password" autoFocus/>
    </div>    
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      <button type="submit" className="btn btn-primary">Submit</button>
    </fieldset>
  </form>
  </Container>
  </>);

    
}

export default Login