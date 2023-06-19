import React from "react";
import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavLink to="/" className="text-decoration-none text-light">
          Home
        </NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <NavLink
              to="/changePassword"
              className="text-decoration-none text-light pe-2"
            >
              Change Password
            </NavLink>
            <NavLink
              to="/profile"
              className="text-decoration-none text-light pe-2"
            >
              Profile
            </NavLink>
            <NavLink
              to="/register"
              className="text-decoration-none text-light pe-2"
            >
              Register
            </NavLink>
            <NavLink to="/login" className="text-decoration-none text-light">
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
