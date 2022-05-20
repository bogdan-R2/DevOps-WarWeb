import React, { useState } from "react";
import { Container, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";

const ProfileComponent = ({userData }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <Card className="text-center">
      <Card.Header>Profile</Card.Header>
      <Card.Body>
        <Card.Title>
          {userData.email}
        </Card.Title>
        <Card.Text style={{ textAlign: "left" }}>
          {userType.student ? (
            <>
              <p>
                <b>Academic Degree:</b> {userData.academicDegree}
              </p>
              <p>
                <b>Year:</b> {userData.year}
              </p>
              <p>
                <b>Group:</b> {userData.group}
              </p>
              <p>
                <b>Email:</b> {userData.email}
              </p>
            </>
          ) : (
            <>
              <p>
                <b>Email:</b> {userData.email}
              </p>
            </>
          )}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {" "}
        {userType.student && "Student"} {userType.professor && "Professor"}{" "}
        {userType.admin && "Admin"}
      </Card.Footer>
    </Card>
  );
};

export default ProfileComponent;
