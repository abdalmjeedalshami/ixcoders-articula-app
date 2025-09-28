import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Offcanvas, Dropdown, Button } from "react-bootstrap";
import profileImage from "../../../../public/images/profile.webp";
import { handleLogout } from "../../../utils/auth";
import "./myDropdown.css";
import { useTranslation } from "react-i18next";

function MyDropdown() {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 959);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  // Listen to window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 959);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? (
        <>
          <Button
            variant="light"
            onClick={handleShow}
            className="d-flex align-items-center gap-2"
          >
            {localStorage.getItem("username")}
            <img height={20} src={profileImage} alt="Profile" />
          </Button>

          <Offcanvas
            show={showOffcanvas}
            onHide={handleClose}
            placement={isArabic ? "end" : "start"}
          >
            <Offcanvas.Header
              className={
                isArabic ? "justify-content-start" : "justify-content-end"
              }
            >
              <Offcanvas.Title>{isArabic ? "القائمة" : "Menu"}</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body className="d-flex flex-column gap-2">
              <Button
                variant="outline-primary"
                onClick={() => {
                  navigate("/account");
                  handleClose();
                }}
              >
                {isArabic ? "حسابي" : "My Account"}
              </Button>
              <Button
                variant="outline-primary"
                onClick={() => {
                  navigate("/my_articles");
                  handleClose();
                }}
              >
                {isArabic ? "مقالاتي" : "My Articles"}
              </Button>
              <Button
                variant="outline-danger"
                onClick={() => {
                  handleLogout(navigate);
                  handleClose();
                }}
              >
                {isArabic ? "تسجيل الخروج" : "Logout"}
              </Button>
            </Offcanvas.Body>
          </Offcanvas>
        </>
      ) : (
        <Dropdown className="custom-dropdown">
          <Dropdown.Toggle id="dropdown-basic" className="px-0">
            <div className="d-flex align-items-center gap-3">
              {localStorage.getItem("username")}
              <img height={20} src={profileImage} alt="Profile" />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu
            align={isArabic ? "end" : "start"}
            style={{ marginInlineStart: "-7rem" }}
          >
            <Dropdown.Item onClick={() => navigate("/account")}>
              My Account
            </Dropdown.Item>
            <Dropdown.Item onClick={() => navigate("/my_articles")}>
              My Articles
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleLogout(navigate)}>
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}

export default MyDropdown;
