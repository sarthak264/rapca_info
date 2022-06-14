import React, { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { RouteDefinitions } from "../../utils/RouteDefinitions";
import ZaioLogo from "../../assets/images/zaio-logo.png";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
interface Props {}

export const DashboardNavbar = (props: Props) => {
  const { user } = useContext(UserContext);
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href={RouteDefinitions.ROUTE_DASHBOARD}>
          <img src={ZaioLogo} alt="Zaio.io" height="60px" />
        </Navbar.Brand>
        {user && (
          <Nav className="ms-auto d-flex flex-row gap-3">
            <Nav.Link href="#">{user.email}</Nav.Link>
            <Nav.Link as={Link} to="/logout?src=user">
              Logout
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
};
