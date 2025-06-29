import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
  const links = [
    { label: "Home", to: "/" },
    { label: "Companies", to: "/companies" },
    { label: "Quotations", to: "/quotations" },
  ];
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Nav className="me-auto">
          {links.map((link) => (
            <Nav.Link as={Link} to={link.to} key={link.to}>
              {link.label}
            </Nav.Link>
          ))}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
