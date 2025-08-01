import { useNavigate } from "react-router";
import { useState } from "react";
import tinycolor from "tinycolor2";
import colors from "../../../theme/colors";

const MyButton = ({
  disabled = false,
  type = "",
  text = "Click me",
  color = "#fff",
  backgroundColor = colors.primary,
  route = "",
  classes = "",
  hoverColor = tinycolor(color).lighten(50).toString(),
  hoverBackgroundColor = tinycolor(backgroundColor).darken(15).toString(),
}) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const baseStyle = {
    color: hover ? hoverColor : color,
    backgroundColor: hover ? hoverBackgroundColor : backgroundColor,
    transition: "background-color 0.3s ease, color 0.3s ease",
  };

  return (
    <button
      disabled={disabled}
      type={type}
      className={`my-button rounded-0 border-0 px-4 py-2 ${classes}`}
      onClick={() => navigate(route)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={baseStyle}
    >
      <div className="d-flex align-items-center gap-2 fs-6">{text}</div>
    </button>
  );
};

export default MyButton;
