export const handleLoginAuth = async ({
  event,
  inputData,
  setLoading,
  setLogInError,
  setUser,
  navigate,
}) => {
  console.log("The start of handleLogin method..");
  event.preventDefault();
  setLogInError(false);
  
  setLoading(true);

  try {
    let data;

    if (
      inputData.username === "abdalmjeed" &&
      inputData.password === "123456"
    ) {
      console.log(inputData.username);
      console.log(inputData.password);
      console.log("Now new login auth fired.");
      // Local demo user
      data = {
        current_user: { uid: "1", roles: "admin", name: "abdalmjeed" },
        csrf_token: "123",
        logout_token: "123",
      };
      if (!data) {
        throw new Error("Login failed");
      }
    } else {
      throw new Error("Invalid username or password");
    }

    const basicAuth = btoa(`${inputData.username}:${inputData.password}`);

    setUser({
      id: data.current_user.uid,
      roles: data.current_user.roles,
      username: data.current_user.name,
      csrf_token: data.csrf_token,
      logout_token: data.logout_token,
    });

    localStorage.setItem("username", data.current_user.name);
    localStorage.setItem("user_id", data.current_user.uid);
    localStorage.setItem("password", inputData.password);
    localStorage.setItem("token", btoa(basicAuth));
    localStorage.setItem("apiToken", data.csrf_token);

    window.dispatchEvent(new Event("tokenUpdated"));
    navigate("/");
  } catch (error) {
    setLogInError(error.message);
    console.error("Login error:", error);
  } finally {
    setLoading(false);
  }
};
