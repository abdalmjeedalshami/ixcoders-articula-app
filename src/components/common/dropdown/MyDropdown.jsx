import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Offcanvas, Dropdown, Button } from "react-bootstrap";
import profileImage from "../../../../public/images/profile.webp";
import { handleLogout } from "../../../utils/auth";
import "./myDropdown.css";
import { useTranslation } from "react-i18next";
import { useUser } from "../../../utils/UserContext";

function MyDropdown() {
  const { user } = useUser();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 959);

  const handleClose = () => setShowOffcanvas(false);
  const handleShow = () => setShowOffcanvas(true);

  // Track the profile image in local state
  const [profileSrc, setProfileSrc] = useState(
    user.user_picture?.[0]?.url || "/images/default-profile.jpg"
  );

  // Listen to any change in user object
  useEffect(() => {
    setProfileSrc(user.user_picture?.[0]?.url || "/images/default-profile.jpg");
  }, [user.user_picture?.[0]?.url]); // <-- watch the entire user object

  // Listen to window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 959);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [user.user_picture?.[0]?.url]);

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
              closeButton
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
            <div className="d-flex justify-content-center align-items-center gap-3 px-3">
              {localStorage.getItem("username")}
              <img
                src={profileSrc}
                alt="Profile"
                className="img-fluid border"
                style={{
                  maxWidth: "150px",
                  height: "2rem",
                  objectFit: "cover",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = profileImage;
                }}
              />
              {/* <img height={20} src={profileImage} alt="Profile" /> */}
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ marginInlineStart: "-7rem" }}>
            <Dropdown.Item
              className="d-flex justify-content-start"
              onClick={() => navigate("/account")}
            >
              {isArabic ? "الحساب" : "My Account"}
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex justify-content-start"
              onClick={() => navigate("/my_articles")}
            >
              {isArabic ? "مقالاتي" : "My Articles"}
            </Dropdown.Item>
            <Dropdown.Item
              className="d-flex justify-content-start"
              onClick={() => handleLogout(navigate)}
            >
              {isArabic ? "تسجيل الخروج" : "Logout"}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </>
  );
}

export default MyDropdown;
