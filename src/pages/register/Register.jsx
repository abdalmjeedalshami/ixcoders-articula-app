import { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import registerImage from "../../../public/images/register/register.png";
import colors from "../../theme/colors";
import MyButton from "../../components/common/my_button/MyButton";
import { UserModel } from "../../models/UserModel";
import MySpinner from "../../components/common/MySpinner/MySpinner";

const Register = () => {
  const [inputData, setInputData] = useState({
    name: {
      value: "",
    },
    field_name: {
      value: "",
    },
    field_surname: {
      value: "",
    },
    mail: {
      value: "",
    },
    field_mobile: {
      value: "",
    },
    field_gender: {
      target_id: "",
    },
    pass: {
      value: "",
    },
  });

  const [user, setUser] = useState({
    uid: [
      {
        value: null,
      },
    ],
    uuid: [
      {
        value: "",
      },
    ],
    langcode: [
      {
        value: "",
      },
    ],
    name: [
      {
        value: "",
      },
    ],
    created: [
      {
        value: "",
        format: "",
      },
    ],
    changed: [
      {
        value: "",
        format: "",
      },
    ],
    default_langcode: [
      {
        value: null,
      },
    ],
    path: [
      {
        alias: "",
        pid: null,
        langcode: "",
      },
    ],
    field_gender: [
      {
        target_id: null,
        target_type: "",
        target_uuid: "",
        url: "",
      },
    ],
    field_mobile: [
      {
        value: "",
      },
    ],
    field_name: [
      {
        value: "",
      },
    ],
    field_surname: [
      {
        value: "",
      },
    ],
    user_picture: [],
    password: [
      {
        value: "",
      },
    ],
  });

  const [initializing, setInitializing] = useState(true);
  const [registerError, setRegisterError] = useState();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setRegisterError(false);

    setLoading(true);
    console.log("This is inputData: " + JSON.stringify(inputData));
    localStorage.setItem("password", inputData.pass.value);

    fetch(`https://tamkeen-dev.com/api/user/registerpass?_format=json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: {
          value: inputData.name,
        },
        field_name: {
          value: inputData.field_name,
        },
        field_surname: {
          value: inputData.field_surname,
        },
        mail: {
          value: inputData.mail,
        },
        field_mobile: {
          value: inputData.field_mobile,
        },
        field_gender: {
          target_id: inputData.field_gender,
        },
        pass: {
          value: inputData.pass.value,
        },
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
        const password = [{ value: localStorage.getItem("password") }];
        setUser({
          uid: data.uid,
          uuid: data.uuid,
          langcode: data.langcode,
          name: data.name,
          created: data.created,
          changed: data.changed,
          default_langcode: data.default_langcode,
          path: data.path,
          field_gender: data.field_gender,
          field_mobile: data.field_mobile,
          field_name: data.field_name,
          field_surname: data.field_surname,
          user_picture: data.user_picture,
          password: password,
        });
        console.log(`This is user: ` + JSON.stringify(user));

        localStorage.setItem("username", data.name[0].value);
      })
      .catch((err) => {
        console.log(err);
        setRegisterError(err.message);
      })
      .finally(() => {
        console.log("Fetch ended");
        console.log(inputData.pass.value);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("username") && localStorage.getItem("password")) {
      setUser({
        name: [{ value: localStorage.getItem("username") }],
        password: [{ value: localStorage.getItem("password") }],
      });
    }

    setInitializing(false);
  }, []);

  if (initializing) {
    return <></>;
  }

  if (loading) {
    return (
      <>
        <div
          style={{ height: "500px" }}
          className="d-flex justify-content-center align-items-cetner"
        >
          <MySpinner />
        </div>
      </>
    );
  }

  if (user.name[0].value != "" && user.password[0].value != "") {
    return (
      <>
        <h1 className="mt-5">
          Hello {user.name[0].value}, your password is {user.password[0].value}.
        </h1>
        <MyButton route="/login" />
      </>
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
                background: `url(${registerImage}) no-repeat center center`,
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
              <h1>Register</h1>

              <form id="registerForm" onSubmit={handleFormSubmit}>
                {registerError ? (
                  <div className="alert alert-danger mb-3">{registerError}</div>
                ) : (
                  ""
                )}
                {/* username */}
                <div className="mb-3">
                  <label htmlFor="Username">Username</label>
                  <input
                    type="text"
                    placeholder="Type your username"
                    className="form-control"
                    id="username"
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        name: { value: e.target.value },
                      });
                    }}
                    required
                  />
                </div>
                {/* Name */}
                <div className="mb-3">
                  <label htmlFor="Name">Name</label>
                  <input
                    type="text"
                    placeholder="Type your name"
                    className="form-control"
                    id="field_name"
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        field_name: { value: e.target.value },
                      });
                    }}
                    required
                  />
                </div>
                {/* Surname */}
                <div className="mb-3">
                  <label htmlFor="Surname">Surname</label>
                  <input
                    type="text"
                    placeholder="Type your field_surname"
                    className="form-control"
                    id="field_surname"
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        field_surname: { value: e.target.value },
                      });
                    }}
                    required
                  />
                </div>
                {/* mail */}
                <div className="mb-3">
                  <label htmlFor="Email">Email</label>
                  <input
                    type="text"
                    placeholder="Type your email"
                    className="form-control"
                    id="email"
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        mail: { value: e.target.value },
                      });
                    }}
                    required
                  />
                </div>
                {/* field_mobile */}
                <div className="mb-3">
                  <label htmlFor="Phone">Phone number</label>
                  <input
                    type="text"
                    placeholder="Type your Phone Number"
                    className="form-control"
                    id="field_phone"
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        field_mobile: { value: e.target.value },
                      });
                    }}
                    required
                  />
                </div>
                {/* field_gender */}
                <div className="mb-3">
                  <label htmlFor="Gender">Gender</label>
                  <input
                    type="text"
                    placeholder="Type your gender"
                    className="form-control"
                    id="field_gender"
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        field_gender: { value: e.target.value },
                      });
                    }}
                    required
                  />
                </div>
                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    placeholder="Type your password"
                    className="form-control"
                    id="password"
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        pass: { value: e.target.value },
                      });
                    }}
                    required
                  />
                </div>
                {/* Register button */}
                <MyButton
                  disabled={loading}
                  text={loading ? "Registering ...." : "Register"}
                />
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
