import { useNavigate } from "react-router";
import profileImage from "../../../../public/images/profile.webp";
import { handleLogout } from "../../../utils/auth";
import Dropdown from "react-bootstrap/Dropdown";
import "./myDropdown.css";



function BasicExample() {
  const navigate = useNavigate();

  // async function handleLogout1() {
  //   try {
  //     const qqq = await apiFetch("/logout", {
  //       method: "POST",
  //       body: { token: localStorage.getItem("apiToken") },
  //       // requireCsrf: true,
  //     });

  //     localStorage.clear();
  //     window.dispatchEvent(new Event("tokenUpdated"));
  //     navigate("/login");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // const handleLogout2 = () => {
  //   fetch(`https://tamkeen-dev.com/api/user/logout`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       token: localStorage.getItem("apiToken"),
  //     }),
  //   })
  //     .then((respnose) => {
  //       if (!respnose.ok) return new Error("errorrrr");
  //       console.log("logged-out success");
  //       localStorage.clear();
  //       window.dispatchEvent(new Event("tokenUpdated"));
  //       navigate("/login");
  //     })
  //     .then(() => {})
  //     .catch((e) => {
  //       console.log(e);
  //     })
  //     .finally(() => {});
  // };

  return (
    <Dropdown className="custom-dropdown">
      <Dropdown.Toggle id="dropdown-basic">
        <div className="d-flex align-items-center gap-3">
          {localStorage.getItem("username")}
          <img height={20} src={profileImage} alt="" />
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          onClick={(_) => {
            navigate("/account");
          }}
        >
          My Account
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            navigate("/my_articles");
          }}
        >
          My Articles
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            handleLogout(navigate);
          }}
        >
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
