import colors from "../../../theme/colors";

const MyLine = ({ color }) => {
  return (
    <div
      className="w-100"
      style={{
        height: "1px",
        backgroundColor: color || colors.sectionBackground,
      }}
    ></div>
  );
};

export default MyLine;
