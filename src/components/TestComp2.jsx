import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";

import { NavLink } from "react-router";
import "./my_navbar/MyNavbar.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import colors from "../theme/colors";

function TestNavbar() {
  return (
    <>
      <Navbar expand="lg" className="py-0 my-bg-black" bg="dark" variant="dark">
        <Container>
          <Navbar.Toggle aria-controls="offcanvasNavbar" />

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="start"
          >
            <Offcanvas.Header
              closeButton
              style={{ backgroundColor: colors.backgrounds.navbar }}
            >
              <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">
                Articula
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body
              style={{ backgroundColor: colors.backgrounds.navbar }}
            >
              <Nav className="me-auto">
                <NavLink className={"py-1"} to={"/"}>
                  Home
                </NavLink>
                <NavLink className={"py-1"} to={"/articles"}>
                  Articles
                </NavLink>
                <NavLink className={"py-1"} to={"/vacancies"}>
                  Vacancies
                </NavLink>
                <NavLink className={"py-1"} to={"/about"}>
                  About
                </NavLink>
                <NavLink className={"py-1"} to={"/contact"}>
                  Contact
                </NavLink>
              </Nav>

              <div className="d-flex justify-content-between align-items-center gap-3 mt-3 mt-md-0 mx-5 mx-md-0">
                <a href="#">
                  <FaFacebookF />
                </a>
                <a href="#">
                  <FaInstagram />
                </a>
                <a href="#">
                  <FaLinkedinIn />
                </a>
                <a href="#">
                  <FaTwitter />
                </a>
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default TestNavbar;
