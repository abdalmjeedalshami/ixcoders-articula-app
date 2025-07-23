import { Navbar, Container } from "react-bootstrap";
import MyButton from "../my_button/MyButton";
import colors from "../../theme/colors";
import { NavLink } from "react-router";

const MyAppBar = ({ logo }) => {
  return (
    <>
      <Navbar className="my-bg-white border border-bottom py-4">
        <Container>
          <NavLink
            to={"/"}
            className="d-flex justify-content-bewteen align-items-center gap-2"
          >
            <img src={logo} alt="" />
            <span className="fs-3 fw-bold">Articula</span>
          </NavLink>

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
        </Container>
      </Navbar>
    </>
  );
};

export default MyAppBar;
