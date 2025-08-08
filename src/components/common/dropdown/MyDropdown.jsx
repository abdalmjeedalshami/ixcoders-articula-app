import Dropdown from "react-bootstrap/Dropdown";
import { MdPersonOutline } from "react-icons/md";
import "./myDropdown.css";

function BasicExample() {
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
        <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BasicExample;
