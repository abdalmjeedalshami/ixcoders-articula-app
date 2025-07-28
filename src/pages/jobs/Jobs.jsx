import MyBreadcrumb from "../../components/common/my_breadcrumb/MyBreadcrumb";
import MyLine from "../../components/common/my_line/MyLine";
import BasicSection from "../../components/sections/basic_section/BasicSection";
import girleImage from "../../../public/images/jobs/girle.png";
import groupImage from "../../../public/images/jobs/group.jpg";
import colors from "../../theme/colors";
import CategoryCard from "../../components/cards/category_card/CategoryCard";
import MySection from "../../components/sections/my_section/MySection";
import { Row } from "react-bootstrap";
import CreditCardIcon from "../../../public/icons/CreditCard.svg";
import GiftIcon from "../../../public/icons/Gift.svg";
import ArmchairIcon from "../../../public/icons/Armchair.svg";
import ForkKnifeIcon from "../../../public/icons/ForkKnife.svg";
import TrophyIcon from "../../../public/icons/Trophy.svg";
import HandshakeIcon from "../../../public/icons/Handshake.svg";
import articleImage from "../../assets/images/article_image.png";
import JobCard from "../../components/cards/job_card/JobCard";
import MyFooter from "../../components/layout/my_footer/MyFooter";

const breadcrumbPath = [
  { label: "Home", to: "/" },
  { label: "Jobs", to: "/jobs" },
];

const categories = [
  {
    id: 1,
    name: "Healthy Food & Snacks",
    articleCount: 63476,
    image: ForkKnifeIcon,
    color: "#EBEBFF",
  },
  {
    id: 2,
    name: "Personal Career Growth",
    articleCount: 63476,
    image: ArmchairIcon,
    color: "#E1F7E3",
  },
  {
    id: 3,
    name: "Vacation & Paid Time Off",
    articleCount: 63476,
    image: GiftIcon,
    color: "#FFF2E5",
  },
  {
    id: 4,
    name: "Special Allowance & Bonuse",
    articleCount: 63476,
    image: CreditCardIcon,
    color: "#FFF0F0",
  },
  {
    id: 5,
    name: "Competitive Salary",
    articleCount: 63476,
    image: HandshakeIcon,
    color: "#FFFFFF",
    iconBackground: "#FF6636",
  },
  {
    id: 6,
    name: "Well-being memberships",
    articleCount: 63476,
    image: TrophyIcon,
    color: "#F5F7FA",
  },
  {
    id: 7,
    name: "Maternity/Paternity Benefits",
    articleCount: 63476,
    image: ForkKnifeIcon,
    color: "#EBEBFF",
  },
  {
    id: 8,
    name: "Eduguard Annual Events",
    articleCount: 63476,
    image: ForkKnifeIcon,
    color: "#F5F7FA",
  },
];

const jobs = [
  {
    id: 1,
    image: articleImage,
    tag: { text: "Featured", color: "#15711F", background: "#E1F7E3" },
    salary: "$300",
    title: "System Analysis",
    description: "2 Years of experience ",
  },
  {
    id: 2,
    image: articleImage,
    tag: { text: "Featured", color: "#993D20", background: "#FFEEE8" },
    salary: "$300-400",
    title: "Frontend Developer (React / Nextjs)",
    description: "+5 Years of experience",
  },
  {
    id: 3,
    image: articleImage,
    tag: { text: "Urgent", color: "#15711F", background: "#E1F7E3" },
    salary: "$300-500",
    title: "UI/UX Designer",
    description: "2 Years of experience ",
  },
  {
    id: 4,
    image: articleImage,
    tag: { text: "Featured", color: "#15711F", background: "#E1F7E3" },
    salary: "$450",
    title: "ASP Backend Developer",
    description: "+3 Years of experience",
  },
];

const Jobs = () => {
  return (
    <>
      <MyBreadcrumb title={"Jobs"} path={breadcrumbPath} />

      <BasicSection
        text={{
          title: "Join the most incredible & creative team.",
          desc: "Proin gravida enim augue, dapibus ultrices eros feugiat et. Pellentesque bibendum orci felis, sit amet efficitur felis lacinia ac. Mauris gravida justo ac nunc consectetur.",
        }}
        button={{ text: "View Open Positions" }}
        image={girleImage}
      />

      <MyLine />

      <BasicSection
        backgroundColor={colors.sectionBackground}
        reversed={true}
        split={true}
        text={{
          title: "Why you will join our team",
          desc: "Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio. ",
        }}
        image={groupImage}
        checkedList={[
          {
            title: "Ut justo ligula, vehicula sed egestas vel.",
            desc: "Quisque leo leo, suscipit sed arcu sit amet, iaculis feugiat felis. Vestibulum non consectetur tortor. Morbi at orci vehicula, vehicula mi ut, vestibulum odio. ",
          },
          {
            title: "Aenean vitae leo leo praesent ullamcorper ac.",
            desc: "Aenean vitae leo leo. Praesent ullamcorper ac libero et mattis. Aenean vel erat at neque viverra feugiat. ",
          },
        ]}
      />

      <MySection
        header={{ title: "Our Perks & Benefits" }}
        body={
          <Row>
            {categories.map((category) => (
              <CategoryCard big key={category.id} category={category} />
            ))}
          </Row>
        }
      />

      <MySection
        backgroundColor={colors.sectionBackground}
        header={{
          title: "Our all open positions (04)",
        }}
        body={
          <Row>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </Row>
        }
      />

      <MyFooter />
    </>
  );
};

export default Jobs;
