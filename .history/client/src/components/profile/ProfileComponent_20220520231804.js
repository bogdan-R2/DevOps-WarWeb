import React, { useState } from "react";
import { Container, Navbar, NavDropdown, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import Card from "react-bootstrap/Card";

const ProfileComponent = ({userData }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  return (
    <Card className="text-center">
      <Card.Header>My Profile</Card.Header>
      <Card.Body>
        <Card.Title>
          {userData.fullName}
        </Card.Title>
        <Card.Text style={{ textAlign: "left" }}>
            
              <p>
                <b>Name:</b> {userData.fullName}
              </p>
              <p>
                <b>City:</b> {userData.city}
              </p>
              <p>
                <b>Country:</b> {userData.country}
              </p>
              <p>
                <b>Email:</b> {userData.email}
              </p>
            
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">
        {" "}
      </Card.Footer>
    </Card>
  );
};

export default ProfileComponent;
