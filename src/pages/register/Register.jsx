import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const Register = () => {
  const [registerData, setRegisterData] = useState({
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

  const [current_user, setCurrent_user] = useState({
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
  });

  const [initializing, setInitializing] = useState(true);
  const [logInError, setLogInError] = useState();
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    setLogInError(false);

    setLoading(true);

    fetch(`https://tamkeen-dev.com/api/user/registerpass?_format=json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: {
          value: registerData.name,
        },
        field_name: {
          value: registerData.field_name,
        },
        field_surname: {
          value: registerData.field_surname,
        },
        mail: {
          value: registerData.mail,
        },
        field_mobile: {
          value: registerData.field_mobile,
        },
        field_gender: {
          target_id: registerData.field_gender,
        },
        pass: {
          value: registerData.pass,
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
        console.log(data);
        setCurrent_user({
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

        localStorage.setItem("userID", data.uid[0].value);
        localStorage.setItem("userName", data.name[0].value);
        localStorage.setItem("userPhone", data.field_mobile[0].value);
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
    if (localStorage.getItem("userID") && localStorage.getItem("userName")) {
      setCurrent_user({
        uid: [{value: localStorage.getItem("userID")}],
        name: [{value: localStorage.getItem("userName")}],
        field_mobile: [{value: localStorage.getItem("userPhone")}],
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

  if (current_user.uid[0].value != "" && current_user.name[0].value != "") {
    return (
      <h1 className="mt-5">
        Hello {current_user.name[0].value}, your #ID is{" "}
        {current_user.uid[0].value} and your phone is: {current_user.field_mobile[0].value}
      </h1>
    );
  }

  return (
    <Container>
      <h1>Register</h1>
      <form id="registerForm" onSubmit={handleFormSubmit}>
        {logInError ? (
          <div className="alert alert-danger mb-3">{logInError}</div>
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
              setRegisterData({
                ...registerData,
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
              setRegisterData({
                ...registerData,
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
              setRegisterData({
                ...registerData,
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
              setRegisterData({
                ...registerData,
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
              setRegisterData({
                ...registerData,
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
              setRegisterData({
                ...registerData,
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
              setRegisterData({
                ...registerData,
                pass: { value: e.target.value },
              });
            }}
            required
          />
        </div>

        {/* Register button */}
        <div>
          <button disabled={loading}>
            {loading ? <i>Registering ....</i> : "Register"}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Register;
