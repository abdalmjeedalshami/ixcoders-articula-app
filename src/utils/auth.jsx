import { apiFetch } from "../services/api";

export const registerUser = async ({
  event,
  inputData,
  setLoading,
  setMessage,
  setRegisterError,
  setUser,
  resetInputData,
}) => {
  event.preventDefault();
  setRegisterError(null); // Clear any previous errors
  setLoading(true);

  try {
    const data = await apiFetch("/registerpass?_format=json", {
      method: "POST",
      body: {
        name: { value: inputData.name },
        field_name: { value: inputData.field_name },
        field_surname: { value: inputData.field_surname },
        mail: { value: inputData.mail },
        field_mobile: { value: inputData.field_mobile },
        field_gender: { target_id: inputData.field_gender.target_id },
        pass: { value: inputData.pass.value },
      },
    });

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

    setMessage(
      "✅ Account created successfully. An activation email has been sent to your inbox."
    );

    resetInputData();
  } catch (error) {
    setRegisterError(error.message);
    console.error("Registration error:", error);
  } finally {
    setLoading(false);
  }
};

export const handleLogin = async ({
  event,
  inputData,
  setLoading,
  setLogInError,
  setUser,
  navigate,
}) => {
  event.preventDefault();
  setLogInError(false);
  setLoading(true);

  try {
    const data = await apiFetch("/login?_format=json", {
      method: "POST",
      body: {
        name: inputData.username,
        pass: inputData.password,
      },
    });

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

export const handleLogout = async (navigate) => {
  try {
    const tokenResponse = await fetch(
      "https://tamkeen-dev.com/api/session/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _format: "json" }),
      }
    );

    if (!tokenResponse.ok) {
      throw new Error("Failed to retrieve session token");
    }

    const newToken = await tokenResponse.text();
    localStorage.setItem("apiToken", newToken);

    const logoutResponse = await fetch(
      "https://tamkeen-dev.com/api/user/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _format: "json",
          token: newToken,
        }),
      }
    );

    if (!logoutResponse.ok) {
      throw new Error("Logout request failed");
    }

    localStorage.clear();
    window.dispatchEvent(new Event("tokenUpdated"));
    navigate("/login");
  } catch (error) {
    console.error("Logout process encountered an error:", error);
  }
};

export const deleteUserById = async (userId, csrfToken) => {
  try {
    const response = await fetch(
      `https://tamkeen-dev.com/api/user/${userId}?_format=json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
      }
    );

    console.log("Status code:", response.status);

    if (response.status !== 204) {
      const errorText = response; // In case server returns error details
      throw new Error(`Delete failed: ${response.status} - ${errorText}`);
    }

    console.log("User deleted successfully");
    return true;
  } catch (error) {
    console.error("Delete error:", error);
    return false;
  } finally {
    console.log("Delete request completed");
  }
};
