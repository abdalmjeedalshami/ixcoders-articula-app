import Dropdown from "react-bootstrap/Dropdown";
import { MdPersonOutline } from "react-icons/md";
import "./myDropdown.css";
import { useNavigate } from "react-router";
import { apiFetch } from "../../../services/api";
import profileImage from "../../../../public/images/profile.webp";

function BasicExample() {
  const navigate = useNavigate();

  async function handleLogout1() {
    try {
      await apiFetch("/logout", {
        method: "POST",
        body: { token: localStorage.getItem("apiToken") },
        // requireCsrf: true,
      });

      localStorage.removeItem("apiToken");
      localStorage.removeItem("token");
      window.dispatchEvent(new Event("tokenUpdated"));
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  }

  const navigateToAccount = () => {
    navigate("/account");
  };
  const navigateToMyArticles = () => {
    navigate("/my_articles");
  };

  return (
    <Dropdown className="custom-dropdown">
      <Dropdown.Toggle id="dropdown-basic">
        <div className="d-flex align-items-center gap-3">
          {localStorage.getItem("username")}
          <img height={20} src={profileImage} alt="" />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={navigateToAccount}>My Account</Dropdown.Item>
        <Dropdown.Item onClick={navigateToMyArticles}>
          My Articles
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout1}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
