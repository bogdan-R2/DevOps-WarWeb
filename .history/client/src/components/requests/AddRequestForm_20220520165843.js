import React, { useRef, useState } from "react";
import {
  Form,
  Card,
  Button,
  Alert,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { database } from "../../firebase";
import axios from "axios";



const AddRequestForm = ({ userData }) => {
  const courseNameRef = useRef();
  const academicDegreeRef = useRef();
  const yearRef = useRef();
  const postedBy = useRef();
  const descriptionRef = useRef();
  const cityRef = useRef();
  const countryRef = useRef();
  const phoneNumberRef = useRef();
  const [selectedDay, setSelectedDay] = useState("Select");
  const categories = ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products'];
 // enum: ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products'],
 const [selectedCategory, setSelectedCategory] = useState("Select");
 const [selectedRequestType, setSelectedRequestType] = useState("Select");
 const userId = userData._id;
 const [errorMessage, setErrorMessage] = useState("");

  const [selectedRequests, setSelectedrequests] = useState("Select");
  const requests = [
    "Offer",
    "Request"];

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectCategory = (e) => {
    setSelectedCategory(e);
  };


  const handleSelectRequestType = (e) => {
    setSelectedRequestType(e);
  };

  async function postRequest() {
    try {
      console.log('ajunge in post')
      if(userId !== null ) {
      axios({
      method: 'post',
      url: 'http://127.0.0.1:5000/api/request',
      data: {
        city: cityRef.current.value, // string
        country: countryRef.current.value, // string
        phoneNumber: phoneNumberRef.current.value, // string
        category: selectedCategory,
        requestType: selectedRequestType,
        description: descriptionRef.current.value,
        postedBy: -1,
   }
  })}}
    catch (error) {
      setErrorMessage(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      var requestData = {
        city: cityRef.current.value, // string
        country: countryRef.current.value, // string
        phoneNumber: phoneNumberRef.current.value, // string
        category: selectedCategory,
        requestType: selectedRequestType,
        description: descriptionRef.current.value,
        postedBy: -1,
      };


    }
    catch(error) {
        throw new Error(error);
    }


    setLoading(false);
  }

  function getInitials(name) {
    var matches = name.match(/\b(\w)/g);
    return matches.join("");
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Add New Request/Offer</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          
         
          
          
          <Form.Group id="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="city" ref={cityRef} required />
          </Form.Group>
          
          <Form.Group id="country">
            <Form.Label>Country</Form.Label>
            <Form.Control type="country" ref={countryRef} required />
          </Form.Group>


          <Form.Group id="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="phoneNumber" ref={phoneNumberRef} required />
          </Form.Group>
        

          <Form.Group id="requestType">
            <Form.Label>Request Type</Form.Label>
            <DropdownButton
              alignRight
              title={selectedRequestType}
              id="dropdown-menu-align-right"
              onSelect={handleSelectRequestType}
            >
              {requests.map((request) => (
                <Dropdown.Item eventKey={request}>{request}</Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>



          <Form.Group id="category">
            <Form.Label>Categories</Form.Label>
            <DropdownButton
              alignRight
              title={selectedCategory}
              id="dropdown-menu-align-right"
              onSelect={handleSelectCategory}
            >
              {categories.map((category) => (
                <Dropdown.Item eventKey={category}>{category}</Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>
          <Form.Group id="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="description" ref={descriptionRef} required />
          </Form.Group>
          <br />
          <Button className="w-100" type="submit" disabled={loading}>
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddRequestForm;
