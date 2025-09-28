import { Navbar, Container } from "react-bootstrap";
import MyButton from "../../common/my_button/MyButton";
import { NavLink } from "react-router";
import colors from "../../../theme/colors";
import MyDropdown from "../../common/dropdown/MyDropdown";
import { useState, useEffect } from "react";

const MyAppBar = ({ logo }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };
    window.addEventListener("tokenUpdated", handleStorageChange);

    return () => {
      window.removeEventListener("tokenUpdated", handleStorageChange);
    };
  }, []);

  const getTokenFromAPI = () => {
    fetch(`https://tamkeen-dev.com/api/session/token`)
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        localStorage.setItem("apiToken", data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(console.log("fetch ended"));
  };

  return (
    <>
      <Navbar className="my-bg-white border border-bottom py-4">
        <Container className="px-md-0">
          <NavLink
            to={"/"}
            className="d-flex justify-content-bewteen align-items-center gap-2"
          >
            <img src={logo} alt="" />
            <span className="fs-3 fw-bold">Articula</span>
          </NavLink>

          {token ? (
            <MyDropdown />
          ) : (
            <div>
              <MyButton
                classes={"ms-2"}
                text="Create Account"
                color={colors.primary}
                backgroundColor={colors.secondary}
                route="/register"
                hoverColor="white"
                hoverBackgroundColor={colors.primary}
              />
              <MyButton
                classes={"ms-2"}
                text="Sign In"
                color={colors.secondary}
                backgroundColor={colors.primary}
                route="/login"
              />
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default MyAppBar;
