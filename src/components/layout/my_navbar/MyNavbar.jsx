import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import { NavLink } from "react-router";
import "./MyNavbar.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import colors from "../../../theme/colors";
import LanguageToggle from "../../../components/LanguageToggle";
import { useTranslation } from "react-i18next";

function MyNavbar() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <>
      <Navbar expand="lg" className="py-0 my-bg-black" bg="dark" variant="dark">
        <Container className="px-0">
          <Navbar.Toggle aria-controls="offcanvasNavbar" />

          <div
            className="d-none d-md-block text-center"
            dir={isArabic ? "rtl" : "ltr"}
          >
            <LanguageToggle />
          </div>

          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement={isArabic ? "end" : "start"} // Flip side for RTL
          >
            <Offcanvas.Header
              style={{ backgroundColor: colors.backgrounds.navbar }}
            >
              <Offcanvas.Title id="offcanvasNavbarLabel" className="text-white">
                Articula
              </Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body
              style={{ backgroundColor: colors.backgrounds.navbar }}
            >
              <Nav className={isArabic ? "ms-auto" : "me-auto"}>
                <NavLink className="py-1 d-flex justify-content-start" to="/">
                  {isArabic ? "الرئيسية" : "Home"}
                </NavLink>
                <NavLink
                  className="py-1 d-flex justify-content-start"
                  to="/articles"
                >
                  {isArabic ? "المقالات" : "Articles"}
                </NavLink>
                <NavLink
                  className="py-1 d-flex justify-content-start"
                  to="/vacancies"
                >
                  {isArabic ? "الوظائف الشاغرة" : "Vacancies"}
                </NavLink>
                <NavLink
                  className="py-1 d-flex justify-content-start"
                  to="/about"
                >
                  {isArabic ? "من نحن" : "About"}
                </NavLink>
                <NavLink
                  className="py-1 d-flex justify-content-start"
                  to="/contact"
                >
                  {isArabic ? "اتصل بنا" : "Contact"}
                </NavLink>
              </Nav>

              {/* Socials */}
              <div
                className={`socials mb-3 mb-md-0 d-flex justify-content-${
                  isArabic ? "center" : "center"
                } align-items-center gap-3 mt-3 mt-md-0 mx-5 mx-md-0`}
              >
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

              <div
                className="d-md-none text-center"
                dir={isArabic ? "rtl" : "ltr"}
              >
                <LanguageToggle />
              </div>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
