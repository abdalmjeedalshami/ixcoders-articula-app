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

  const [registerError, setRegisterError] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const username = inputData.name.value;
    const password = inputData.pass.value;
    const basicAuth = btoa(`${username}:${password}`);

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
          target_id: inputData.field_gender.target_id,
        },
        pass: {
          value: inputData.pass.value,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((serverError) => {
            throw new Error(
              serverError.message || "حدث خطأ ما.. يرجى مراسلة مديرة الموقع"
            );
          });
        }
        localStorage.setItem("basicAuth", basicAuth);
        setMessage(
          "You have successfully created your account. An activation email sent to you via your email."
        );
        setRegisterError();
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
        });
        setInputData({
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
      })
      .catch((error) => {
        setRegisterError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const basicAuth = localStorage.getItem("basicAuth");
    if (basicAuth) {
      const decodedBasicAuth = atob(basicAuth);
      const [username, password] = decodedBasicAuth.split(":");

      setUser({
        name: [{ value: username }],
        password: [{ value: password }],
      });
    }
  }, []);

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
                {/* username */}
                <div className="mb-3">
                  <label htmlFor="Username">Username</label>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    placeholder="Type your username"
                    value={inputData.name.value}
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
                    value={inputData.field_name.value}
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
                    value={inputData.field_surname.value}
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
                    value={inputData.mail.value}
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
                    value={inputData.field_mobile.value}
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
                  <select
                    type="text"
                    placeholder="Type your gender"
                    className="form-control"
                    id="field_gender"
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        field_gender: { target_id: e.target.value },
                      });
                    }}
                    required
                  >
                    <option value="9">Famale</option>
                    <option value="10">Male</option>
                  </select>
                </div>
                {/* Password */}
                <div className="mb-3">
                  <label htmlFor="Password">Password</label>
                  <input
                    type="password"
                    placeholder="Type your password"
                    className="form-control"
                    id="password"
                    value={inputData.pass.value}
                    onInput={(e) => {
                      setInputData({
                        ...inputData,
                        pass: { value: e.target.value },
                      });
                    }}
                    required
                  />
                </div>

                {/* Validation message */}
                {registerError ? (
                  <div className="alert alert-danger mb-3">{registerError}</div>
                ) : (
                  ""
                )}

                {message ? (
                  <div className="alert alert-success">{message}</div>
                ) : (
                  ""
                )}

                {/* Register button */}
                <MyButton
                  type="submit"
                  disabled={loading}
                  text={loading ? "Registering ...." : "Register"}
                  onSubmit={(e) => {
                    console.log("btn clicked");
                  }}
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
