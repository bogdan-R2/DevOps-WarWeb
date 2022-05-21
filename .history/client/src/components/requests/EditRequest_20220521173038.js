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



const EditRequest = ({ requestData }) => {
  const [description, setDescription] = useState(requestData.description);
  const [city, setCity] = useState(requestData.city);
  const [country, setCountry] = useState(requestData.country);
  const [phoneNumber, setPhoneNumber] = useState(requestData.phoneNumber);
  const [selectedDay, setSelectedDay] = useState(requestData.category);
  const categories = ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products'];
 // enum: ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products'],
 const [selectedCategory, setSelectedCategory] = useState(requestData.category);
 const [selectedRequestType, setSelectedRequestType] = useState(requestData.requestType);
 const [errorMessage, setErrorMessage] = useState("");

  //const [selectedRequests, setSelectedrequests] = useState("Select");
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
      console.log('ajunge in post');
      const request = {
        _id: requestData._id,
        description: description,
        requestType: selectedRequestType,
        city: city, // string
        country: country, // string
        category: selectedCategory,
        phoneNumber: phoneNumber, // string
      }

      if(request !== null) {
        console.log("requestul trimis" + request);
          
        axios({
        method: 'put',
        url: 'http://127.0.0.1:5000/api/request/update',
        data: request
  })}}
    catch (error) {
      setError(error);
      throw new Error(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      postRequest();
    }
    catch(error) {
        throw new Error(error);
    }


    setLoading(false);
  }

  return (
    <Card>
      <Card.Body>
        <h2 className="text-center mb-4">Edit Your Request/Offer</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          
         
          <Form.Group id="city">
            <Form.Label>City</Form.Label>
            <Form.Control type="city" onChange={e=> setCity(e.target.value)}/>
          </Form.Group>
          
          <Form.Group id="country">
            <Form.Label>Country</Form.Label>
            <Form.Control type="country" onChange={e=>setCountry(e.target.value)}/>
          </Form.Group>


          <Form.Group id="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="phoneNumber" onChange={e=>setPhoneNumber(e.target.value)}/>
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

export default EditRequest;
