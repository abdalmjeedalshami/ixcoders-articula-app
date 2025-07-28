import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import colors from "../../../theme/colors";
import { NavLink } from "react-router";
import "./myBreadcrumb.css";

export default function MyBreadcrumb({ title, path }) {
  return (
    <div
      className="text-center py-4"
      style={{ backgroundColor: colors.sectionBackground }}
    >
      <div className="d-inline-flex flex-column">
        <p className="fs-4 fw-bold">{title}</p>
        <Breadcrumbs aria-label="breadcrumb">
          {path.map((item, index) => {
            const isLast = index === path.length - 1;
            return isLast ? (
              <Typography
                key={index}
                className="py-1 custom-link"
                color="text.primary"
              >
                {item.label}
              </Typography>
            ) : (
              <NavLink key={index} className="py-1 custom-link" to={item.to}>
                {item.label}
              </NavLink>
            );
          })}
        </Breadcrumbs>
      </div>
    </div>
  );
}
