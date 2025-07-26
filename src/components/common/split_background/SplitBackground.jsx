const SplitBackground = ({ image }) => {
  return (
    <div
      className="d-flex gap-3 w-100"
      style={{
        height: "350px",
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        className="h-100 ms-auto"
        style={{
          width: "10px",
          backgroundColor: "white",
          marginInlineEnd: "15rem",
        }}
      ></div>
    </div>
  );
};

export default SplitBackground;
