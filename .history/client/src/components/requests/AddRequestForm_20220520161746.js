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
  const semesterRef = useRef();
  const professorEmailRef = useRef();
  const descriptionRef = useRef();

  const [selectedDay, setSelectedDay] = useState("Select");
  const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

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

  const handleSelectDay = (e) => {
    setSelectedDay(e);
  };

  const handleSelectTimeSlot = (e) => {
    setSelectedTimeSlot(e);
  };

  async function digestText(text) {
    const msgUint8 = new TextEncoder().encode(text); // encode as (utf-8) Uint8Array
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8); // hash the message
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // convert buffer to byte array
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(""); // convert bytes to hex string
    return hashHex;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      var courseData = {
        key: "",
        name: courseNameRef.current.value,
        initials: "",
        academicDegree: academicDegreeRef.current.value,
        year: yearRef.current.value, // string
        semester: semesterRef.current.value, // string
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

      courseData.professorKey = await digestText(
        professorEmailRef.current.value
      );

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
        <h2 className="text-center mb-4">Add New Course</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group id="courseName">
            <Form.Label>Course Name</Form.Label>
            <Form.Control type="courseName" ref={courseNameRef} required />
          </Form.Group>
          <Form.Group id="courseName">
            <Form.Label>Professor Email</Form.Label>
            <Form.Control
              type="professorEmail"
              ref={professorEmailRef}
              required
            />
          </Form.Group>
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
            <Form.Control type="semester" ref={semesterRef} required />
          </Form.Group>
          <Form.Group id="day">
            <Form.Label>Day</Form.Label>
            <DropdownButton
              alignRight
              title={selectedDay}
              id="dropdown-menu-align-right"
              onSelect={handleSelectDay}
            >
              {weekDays.map((day) => (
                <Dropdown.Item eventKey={day}>{day}</Dropdown.Item>
              ))}
            </DropdownButton>
          </Form.Group>
          <Form.Group id="timeInterval">
            <Form.Label>Time Slot</Form.Label>
            <DropdownButton
              alignRight
              title={selectedTimeSlot}
              id="dropdown-menu-align-right"
              onSelect={handleSelectTimeSlot}
            >
              {timeSlots.map((slot) => (
                <Dropdown.Item eventKey={slot}>{slot}</Dropdown.Item>
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
