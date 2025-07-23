import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [current_user, setCurrent_user] = useState({
    user_id: "",
    user_name: "",
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
        name: loginData.username,
        pass: loginData.password,
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
          user_id: data.current_user.uid,
          user_name: data.current_user.name,
          logout_token: data.logout_token,
        });

        localStorage.setItem("userID", data.current_user.uid);
        localStorage.setItem("userName", data.current_user.name);
        localStorage.setItem("logout_token", data.logout_token);
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
        user_id: localStorage.getItem("userID"),
        user_name: localStorage.getItem("userName"),
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

  if (current_user.user_id != "" && current_user.user_name != "") {
    return (
      <h1 className="mt-5">
        Hello {current_user.user_name}, your #ID is {current_user.user_id}
      </h1>
    );
  }

  return (
    <Container>
      <h1>Login</h1>
      <form id="loginForm" onSubmit={handleFormSubmit}>
        {logInError ? (
          <div className="alert alert-danger mb-3">{logInError}</div>
        ) : (
          ""
        )}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Type your username"
            className="form-control"
            id="username"
            onInput={(e) => {
              setLoginData({
                ...loginData,
                username: e.target.value,
              });
            }}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            placeholder="Type your password"
            className="form-control"
            id="password"
            onInput={(e) => {
              setLoginData({
                ...loginData,
                password: e.target.value,
              });
            }}
            required
          />
        </div>
        <div>
          <button disabled={loading}>
            {loading ? <i>Signing in ....</i> : "Sign in"}
          </button>
        </div>
      </form>
    </Container>
  );
};

export default Login;
