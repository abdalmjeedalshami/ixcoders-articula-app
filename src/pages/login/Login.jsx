import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import loginImage from "../../../public/images/login/login.png";
import colors from "../../theme/colors";
import MyButton from "../../components/common/my_button/MyButton";


const Login = () => {
  const [inputData, setInputData] = useState({
    username: "",
    password: "",
  });

  const [user, setUser] = useState({
    id: "",
    roles: [],
    username: "",
    csrf_token: "",
    logout_token: "",
  });

  const [initializing, setInitializing] = useState(true);
  const [logInError, setLogInError] = useState();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setLogInError(false);

    setLoading(true);

    fetch(`https://tamkeen-dev.com/api/user/login?_format=json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputData.username,
        pass: inputData.password,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((serverError) => {
            throw new Error(
              serverError.message || "حدث خطأ ما.. يرجى مراسلة مديرة الموقع"
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);

        setUser({
          id: data.current_user.uid,
          roles: data.current_user.roles,
          username: data.current_user.name,
          csrf_token: data.csrf_token,
          logout_token: data.logout_token,
        });

        localStorage.setItem("user_id", data.current_user.uid);
        localStorage.setItem("username", data.current_user.name);
        localStorage.setItem("csrf_token", data.csrf_token);
        localStorage.setItem("logout_token", data.logout_token);
        localStorage.setItem("roles", data.current_user.roles);
      })
      .catch((err) => {
        console.log(err);
        setLogInError(err.message);
      })
      .finally(() => {
        console.log("Fetch ended");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("user_id") && localStorage.getItem("username")) {
      setUser({
        id: localStorage.getItem("user_id"),
        username: localStorage.getItem("username"),
        csrf_token: localStorage.getItem("csrf_token"),
        logout_token: localStorage.getItem("logout_token"),
      });
    }

    setInitializing(false);
  }, []);

  if (initializing) {
    return <></>;
  }
  // if(loading) {
  //     return (
  //         <>Loading..........</>
  //     )
  // }

  if (user.id != "" && user.username != "") {
    return (
      <h1 className="mt-5">
        Hello {user.username}, your csrf token is {user.csrf_token}
      </h1>
    );
  }

  return (
    <div
      style={{
        background: `linear-gradient(to right, ${colors.backgrounds.png} 100%, white 30%)`,
      }}
    >
      <Container fluid>
        <Row className="g-0">
          <Col md={5} className="d-none d-md-block">
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
          <Col xs={12} md={7}>
            <div
              style={{
                minHeight: "100vh",
                overflowY: "auto",
                padding: "2rem",
                backgroundColor: "white",
              }}
            >
              <h1>Login</h1>
              <form id="loginForm" onSubmit={handleFormSubmit}>
                {logInError ? (
                  <div className="alert alert-danger mb-3">{logInError}</div>
                ) : (
                  ""
                )}
                {/* username */}
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Type your username"
                    className="form-control"
                    id="username"
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        username: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                {/* Password */}
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Type your password"
                    className="form-control"
                    id="password"
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        password: e.target.value,
                      });
                    }}
                    required
                  />
                </div>
                {/* Register button */}
                <MyButton
                  disabled={loading}
                  text={loading ? "Signing in ...." : "Sign in"}
                />
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
