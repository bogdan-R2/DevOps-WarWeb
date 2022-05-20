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

  const [selectedTimeSlot, setSelectedTimeSlot] = useState("Select");
  const timeSlots = [
    "8-10",
    "10-12",
    "12-14",
    "14-16",
    "16-18",
    "18-20",
    "20-22",
  ];

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectCategory = (e) => {
    setSelectedDay(e);
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
        day: selectedDay,
        timeInterval: selectedTimeSlot,
        description: descriptionRef.current.value,
        professorKey: -1,
      };

      courseData["initials"] = getInitials(courseData["name"]);
      courseData["key"] =
        courseData["academicDegree"][0] +
        "-" +
        "Y" +
        courseData["year"] +
        "-" +
        "S" +
        courseData["semester"] +
        "-" +
        courseData["initials"] +
        "-" +
        courseData["name"];


      const databaseRef = database.ref();
      await databaseRef.child("Course/" + courseData["key"]).set(courseData);

      var professorData = {};
      await databaseRef
        .child(`Professor/${courseData.professorKey}`)
        .once("value", function (snapshot) {
          if (snapshot.exists()) {
            professorData = snapshot.val();
          }
        });
      if (professorData.courses === undefined) {
        professorData.courses = [courseData.key];
      } else {
        professorData.courses.push(courseData.key);
      }
      await databaseRef
        .child(`Professor/${courseData.professorKey}`)
        .set(professorData);

      var adminData = {};
      await databaseRef
        .child(`Admin/${userData.key}`)
        .once("value", function (snapshot) {
          if (snapshot.exists()) {
            adminData = snapshot.val();
          }
        });
      if (adminData.courses === undefined) {
        adminData.courses = [courseData.key];
      } else {
        adminData.courses.push(courseData.key);
      }
      await databaseRef.child(`Admin/${userData.key}`).set(adminData);

      window.location.reload();
    } catch (err) {
      console.log(err);
      setError("Failed to add course");
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
              title={selectedDay}
              id="dropdown-menu-align-right"
              onSelect={handleSelectCategory}
            >
              {categories.map((day) => (
                <Dropdown.Item eventKey={day}>{day}</Dropdown.Item>
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
