import BasicSection from "../../components/sections/basic_section/BasicSection";
import notFoundImage from "../../../public/images/not_found/not_found.png";
import colors from "../../theme/colors";

const NotFound = () => {
  return (
    <>
      <BasicSection
        classes={"mb-5"}
        text={{
          date: "Error 404",
          title: "Oops! page not found",
          desc: "Something went wrong. It’s look that your requested could not be found. It's look like the link is broken or the page is removed.",
        }}
        image={notFoundImage}
        button={{ text: "Go Back" }}
      />
    </>
  );
};

export default NotFound;
