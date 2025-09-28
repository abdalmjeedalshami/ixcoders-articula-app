import BasicSection from "../../components/sections/basic_section/BasicSection";
import girleImage from "../../../public/images/contact_us/girle.png";
import MyLine from "../../components/common/my_line/MyLine";
import colors from "../../theme/colors";
import { AiOutlineMail } from "react-icons/ai";
import bimg1 from "../../../public/images/contact_us/bimg1.png";
import bimg2 from "../../../public/images/contact_us/bimg2.jpg";
import bimg3 from "../../../public/images/contact_us/bimg3.jpg";
import bimg4 from "../../../public/images/contact_us/bimg4.jpg";
import BranchesSection from "../../components/sections/branches_section/BranchesSection";
import FormSection from "../../components/sections/form_section/FormSection";
import mapImage from "../../../public/images/contact_us/map.png";
import MyFooter from "../../components/layout/my_footer/MyFooter";
import MyBreadcrumb from "../../components/common/my_breadcrumb/MyBreadcrumb";

const branches = [
  {
    id: 1,
    image: bimg1,
    location: "Damascus, Syria",
    desc: "Lorem Ipsum doller Duis aute irure, No. 6548",
    isMain: true,
  },
  {
    id: 2,
    image: bimg2,
    location: "Amman, Jordan",
    desc: "Lorem Ipsum doller Duis aute irure, No. 6548",
  },
  {
    id: 3,
    image: bimg3,
    location: "Istanbul, Turkey",
    desc: "Lorem Ipsum doller Duis aute irure, No. 6548",
  },
  {
    id: 4,
    image: bimg4,
    location: "Dubai. UAE",
    desc: "Lorem Ipsum doller Duis aute irure, No. 6548",
  },
];

const breadcrumbPath = [
  { label: "Home", to: "/" },
  { label: "Contact", to: "/contact" },
];

const Contact = () => {
  return (
    <>
      <MyBreadcrumb title={"Contact"} path={breadcrumbPath} />

      <BasicSection
        text={{
          title: "Connect with us",
          desc: "Want to chat? We’d love to hear from you! Get in touch with our Customer Success Team to inquire about speaking events, advertising rates, or just say hello.",
        }}
        image={girleImage}
        button={{
          text: (
            <>
              <AiOutlineMail />
              Copy Email
            </>
          ),
        }}
      />

      <MyLine color={colors.borderContact} />

      <BranchesSection
        title={"Our branches all over the world."}
        subtitle={
          "Phasellus sed quam eu eros faucibus cursus. Quisque mauris urna, imperdiet id leo quis, luctus auctor nisi. "
        }
        branches={branches}
      />

      <FormSection />

      <div
        style={{
          height: "250px",
          background: `url(${mapImage})`,
          backgroundRepeat: "no-repeat",
          // backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      ></div>

      <MyFooter />
    </>
  );
};

export default Contact;
