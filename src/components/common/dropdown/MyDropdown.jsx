import Dropdown from "react-bootstrap/Dropdown";
import { MdPersonOutline } from "react-icons/md";
import "./myDropdown.css";
import { useNavigate } from "react-router";
import { apiFetch } from "../../../services/api";

function BasicExample() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    fetch(`https://tamkeen-dev.com/api/session/token?_format=json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.message || "fetch error");
          });
        }
        localStorage.removeItem("basicAuth");
        localStorage.removeItem("username");
        return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(console.log("fetch ended"));

    // fetch(`https://tamkeen-dev.com/api/user/logout?_format=json`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     token: `asdf`,
    //   },
    // });

    // try {
    //   await axios.post("/api/logout"); // 🔹 Your logout API
    //   // Optional: clear tokens/localStorage
    //   localStorage.removeItem("token");

    //   // Redirect to login page
    //   navigate("/login");
    // } catch (error) {
    //   console.error("Logout failed:", error);
    // }
  };

  async function handleLogout1() {
  try {
    await apiFetch("/logout", {
      method: "POST",
      requireCsrf: true,
    });

    localStorage.removeItem("token");
    console.log("Logged out!");
  } catch (error) {
    console.error(error);
  }
}

  return (
    <Dropdown className="custom-dropdown">
      <Dropdown.Toggle id="dropdown-basic">
        <div className="d-flex align-items-center gap-3">
          {localStorage.getItem("username")}
          <MdPersonOutline />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">My Account</Dropdown.Item>
        <Dropdown.Item href="#/action-2">My Articles</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout1}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
