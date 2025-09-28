import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import loginImage from "../../../public/images/login/login.png";
import colors from "../../theme/colors";
import MyButton from "../../components/common/my_button/MyButton";
import { useNavigate } from "react-router";
import { handleLogin } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [logInError, setLogInError] = useState(false);

  const [user, setUser] = useState({
    id: "",
    roles: [],
    username: "",
    csrf_token: "",
    logout_token: "",
  });

  const onSubmit = (e) => {
    handleLogin({
      event: e,
      inputData,
      setLoading,
      setLogInError,
      setUser,
      navigate,
    });
  };

  return (
    <div
      style={{
        background: `linear-gradient(to right, ${colors.backgrounds.png} 100%, white 30%)`,
      }}
    >
      <Container fluid>
        <Row className="g-0">
          {/* Left Image Panel */}
          <Col md={5} className="d-none d-md-block" data-aos="fade-right">
            <div
              className="vh-100 top-0"
              style={{
                backgroundColor: colors.backgrounds.png,
                background: `url(${loginImage}) no-repeat center center`,
                backgroundSize: "contain",
                position: "sticky",
              }}
            ></div>
          </Col>

          {/* Right Form Panel */}
          <Col xs={12} md={7} data-aos="fade-left" data-aos-delay={100}>
            <div
              style={{
                minHeight: "100vh",
                overflowY: "auto",
                padding: "2rem",
                backgroundColor: "white",
              }}
            >
              <h1 data-aos="fade-down" data-aos-delay={200}>
                Login
              </h1>

              <form id="loginForm" onSubmit={onSubmit}>
                {logInError && (
                  <div
                    className="alert alert-danger mb-3"
                    data-aos="fade-up"
                    data-aos-delay={300}
                  >
                    {logInError}
                  </div>
                )}

                {/* Username */}
                <div className="mb-3" data-aos="fade-up" data-aos-delay={400}>
                  <input
                    type="text"
                    placeholder="Type your username"
                    className="form-control"
                    id="username"
                    onInput={(e) =>
                      setInputData({ ...inputData, username: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3" data-aos="fade-up" data-aos-delay={500}>
                  <input
                    type="password"
                    placeholder="Type your password"
                    className="form-control"
                    id="password"
                    onInput={(e) =>
                      setInputData({ ...inputData, password: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Submit Button */}
                <div data-aos="fade-up" data-aos-delay={600}>
                  <MyButton
                    type="submit"
                    disabled={loading}
                    text={loading ? "Signing in ...." : "Sign in"}
                  />
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
