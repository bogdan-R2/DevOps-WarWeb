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

const AddRequestForm = ({ userData }) => {
  const courseNameRef = useRef();
  const academicDegreeRef = useRef();
  const yearRef = useRef();
  const postedBy = useRef();
  const descriptionRef = useRef();
  const cityRef = useRef();
  const [selectedDay, setSelectedDay] = useState("Select");
  const categories = ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products'];
 // enum: ['Medicine', 'Money', 'Food', 'Clothing', 'Hygiene Products'],
 const [selectedCategory, setSelectedCategory] = useState("Select");
 const [selectedRequestType, setSelectedRequestType] = useState("Select");


  const [selectedRequests, setSelectedrequests] = useState("Select");
  const requests = [
    "Offer",
    "Volunteer"];

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectCategory = (e) => {
    setSelectedCategory(e);
  };


  const handleSelectRequestType = (e) => {
    setSelectedRequestType(e);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      var requestData = {
        key: "",
        name: courseNameRef.current.value,
        initials: "",
        academicDegree: academicDegreeRef.current.value,
        year: yearRef.current.value, // string
        city: cityRef.current.value, // string
        category: selectedCategory,
        requestType: selectedRequestType,
        description: descriptionRef.current.value,
        professorKey: -1,
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
          
          <Form.Group id="academicDegree">
            <Form.Label>Academic Degree</Form.Label>
            <Form.Control
              type="academicDegree"
              ref={academicDegreeRef}
              required
            />
          </Form.Group>


          <Form.Group id="year">
            <Form.Label>Year</Form.Label>
            <Form.Control type="year" ref={yearRef} required />
          </Form.Group>
          
          
          
          <Form.Group id="semester">
            <Form.Label>Semester</Form.Label>
            <Form.Control type="city" ref={cityRef} required />
          </Form.Group>
          
          



          <Form.Group id="category">
            <Form.Label>Categories</Form.Label>
            <DropdownButton
              alignRight
              title={selectedCategory}
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
