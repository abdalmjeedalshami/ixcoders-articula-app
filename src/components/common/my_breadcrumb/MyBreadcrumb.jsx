import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import colors from "../../../theme/colors";
import { NavLink } from "react-router";
import "./myBreadcrumb.css";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function ActiveLastBreadcrumb() {
  return (
    <div
      className="text-center py-4"
      style={{ backgroundColor: colors.sectionBackground }}
    >
      <div
        className="d-inline-flex flex-column"
        role="presentation"
        onClick={handleClick}
      >
        <p className="fs-4 fw-bold">About</p>
        <Breadcrumbs aria-label="breadcrumb">
          <NavLink className="py-1 custom-link" to="/">
            Home
          </NavLink>

          <Link
            underline="hover"
            color="text.primary"
            href="/material-ui/react-breadcrumbs/"
            aria-current="page"
          >
            About
          </Link>
        </Breadcrumbs>
      </div>
    </div>
  );
}
