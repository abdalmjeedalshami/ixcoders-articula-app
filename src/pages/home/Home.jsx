import { Row } from "react-bootstrap";
import WelcomeSection from "../../components/sections/welcom_section/WelcomeSection";
import AuthorSection from "../../components/sections/author_section/AuthorSection";
import welcomeImage from "../../assets/images/welcome.jpg";
import articleImage from "../../assets/images/article_image.png";
import cpuIcon from "../../assets/icons/cpu.svg";
import cameraIcon from "../../assets/icons/camera.svg";
import chartBarIcon from "../../assets/icons/chart_bar_horizontal.svg";
import handIcon from "../../assets/icons/handshake.svg";
import megaphoneIcon from "../../assets/icons/megaphone_simple.svg";
import receiptIcon from "../../assets/icons/receipt.svg";
import companyLogo from "../../assets/icons/AMG.CO.svg";
import LatestArticlesSection from "../../components/sections/latest_articles_section/LatestArticlesSection";
import authorImage from "../../assets/images/author.png";
import TrustedSection from "../../components/sections/trusted_section/TrustedSection";
import MyFooter from "../../components/layout/my_footer/MyFooter";
import MySection from "../../components/sections/my_section/MySection";
import CategoryCard from "../../components/cards/category_card/CategoryCard";
import JobCard from "../../components/cards/job_card/JobCard";
import MySwiper from "@components/sliders/my_swiper/MySwiper";
import { Helmet } from "react-helmet";

const categories = [
  {
    id: 1,
    name: "Technology",
    articleCount: 63476,
    image: cpuIcon,
    color: "#EBEBFF",
  },
  {
    id: 2,
    name: "Technology",
    articleCount: 63476,
    image: handIcon,
    color: "#E1F7E3",
  },
  {
    id: 3,
    name: "Technology",
    articleCount: 63476,
    image: receiptIcon,
    color: "#FFF2E5",
  },
  {
    id: 4,
    name: "Technology",
    articleCount: 63476,
    image: chartBarIcon,
    color: "#FFF0F0",
  },
  {
    id: 5,
    name: "Technology",
    articleCount: 63476,
    image: cameraIcon,
    color: "#F5F7FA",
  },
  {
    id: 6,
    name: "Technology",
    articleCount: 63476,
    image: cpuIcon,
    color: "#F5F7FA",
  },
  {
    id: 7,
    name: "Technology",
    articleCount: 63476,
    image: megaphoneIcon,
    color: "#EBEBFF",
  },
  {
    id: 8,
    name: "Technology",
    articleCount: 63476,
    image: cameraIcon,
    color: "#F5F7FA",
  },
];

const articles=[
          {
            id: 1,
            image: articleImage,
            tag: {
              text: "Design",
              color: "#993D20",
              background: "#FFEEE8",
            },
            description: "2021 Complete Python Bootcamp From Zero to Hero",
            auth: "Mohammad Issa",
          },
          {
            id: 2,
            image: articleImage,
            tag: {
              text: "Design",
              color: "#342F98",
              background: "#EBEBFF",
            },
            description: "2021 Complete Python Bootcamp From Zero to Hero",
            auth: "Mohammad Issa",
          },
          {
            id: 3,
            image: articleImage,
            tag: {
              text: "Design",
              color: "#15711F",
              background: "#E1F7E3",
            },
            description: "2021 Complete Python Bootcamp From Zero to Hero",
            auth: "Mohammad Issa",
          },
          {
            id: 4,
            image: articleImage,
            tag: {
              text: "Design",
              color: "#342F98",
              background: "#EBEBFF",
            },
            description: "2021 Complete Python Bootcamp From Zero to Hero",
            auth: "Mohammad Issa",
          },
          {
            id: 5,
            image: articleImage,
            tag: {
              text: "Design",
              color: "#882929",
              background: "#FFF0F0",
            },
            description: "2021 Complete Python Bootcamp From Zero to Hero",
            auth: "Mohammad Issa",
          },
          {
            id: 6,
            image: articleImage,
            tag: {
              text: "Design",
              color: "#882929",
              background: "#FFF0F0",
            },
            description: "2021 Complete Python Bootcamp From Zero to Hero",
            auth: "Mohammad Issa",
          },
          {
            id: 7,
            image: articleImage,
            tag: {
              text: "Design",
              color: "#882929",
              background: "#FFF0F0",
            },
            description: "2021 Complete Python Bootcamp From Zero to Hero",
            auth: "Mohammad Issa",
          },
          {
            id: 8,
            image: articleImage,
            tag: {
              text: "Design",
              color: "#882929",
              background: "#FFF0F0",
            },
            description: "2021 Complete Python Bootcamp From Zero to Hero",
            auth: "Mohammad Issa",
          },
          {
            id: 9,
            image: articleImage,
            tag: {
              text: "Design",
              color: "#882929",
              background: "#FFF0F0",
            },
            description: "2021 Complete Python Bootcamp From Zero to Hero",
            auth: "Mohammad Issa",
          },
          {
            id: 10,
            image: articleImage,
            tag: {
              text: "Design",
              color: "#882929",
              background: "#FFF0F0",
            },
            description: "2021 Complete Python Bootcamp From Zero to Hero",
            auth: "Mohammad Issa",
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

const writers = [
  {
    id: 1,
    image: articleImage,
    name: "Devon Lane",
    position: "Digital Product",
    rating: 4.6,
    articlesNum: 30,
  },
  {
    id: 2,
    image: articleImage,
    name: "Darrell Steward",
    position: "UI/UX Designer",
    rating: 4.9,
    articlesNum: 17,
  },
  {
    id: 3,
    image: articleImage,
    name: "Jane Cooper",
    position: "Managment",
    rating: 4.8,
    articlesNum: 5,
  },
  {
    id: 4,
    image: articleImage,
    name: "Albert Flores",
    position: "Lead Developer",
    rating: 4.7,
    articlesNum: 13,
  },
  {
    id: 5,
    image: articleImage,
    name: "Kathryn Murphy",
    position: "Digital Product",
    rating: 4.2,
    articlesNum: 41,
  },
  {
    id: 6,
    image: articleImage,
    name: "Devon Lane",
    position: "Digital Product",
    rating: 4.6,
    articlesNum: 30,
  },
  {
    id: 7,
    image: articleImage,
    name: "Devon Lane",
    position: "Digital Product",
    rating: 4.6,
    articlesNum: 30,
  },
  {
    id: 8,
    image: articleImage,
    name: "Devon Lane",
    position: "Digital Product",
    rating: 4.6,
    articlesNum: 30,
  },
];

const companies=[
          {
            id: 1,
            image: companyLogo,
          },
          {
            id: 2,
            image: companyLogo,
          },
          {
            id: 3,
            image: companyLogo,
          },
          {
            id: 4,
            image: companyLogo,
          },
          {
            id: 5,
            image: companyLogo,
          },
          {
            id: 6,
            image: companyLogo,
          },
          {
            id: 7,
            image: companyLogo,
          },
          {
            id: 8,
            image: companyLogo,
          },
        ];

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home | Articula</title>
        <meta name="description" content="This is the home page of Articula" />
        <meta name="keywords" content="Learn, Articles" />
      </Helmet>

      <h1 className="d-none">Learn with expert</h1>
      <WelcomeSection
        title={"Learn with expert anytime anywhere"}
        subtitle={
          "Our mission is to help people to find the best source online and learn with expert anytime, anywhere."
        }
        image={welcomeImage}
      />

      <MySection
        header={{ title: "Browse Top Categories" }}
        body={
          <Row>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Row>
        }
        footer={{
          text: "We have more category & subcategory.",
          tail: { text: "Browse All", route: "/jobs" },
        }}
      />

      <LatestArticlesSection
        articles={articles}
      />

      <MySection
        isCard={"true"}
        header={{
          title: "Our Job Opprtunities",
          subtitle:
            "Vestibulum sed dolor sed diam mollis maximus vel nec dolor. Donec varius purus et eleifend porta.",
        }}
        body={
          <Row>
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </Row>
        }
        footer={{
          text: "We have more job Opportunities.",
          tail: { text: "Browse All", route: "/jobs" },
        }}
      />

      <AuthorSection image={authorImage} />

      <MySection
        isCard={"true"}
        header={{
          title: "Top Writers",
        }}
        body={<MySwiper list={writers} />}
        footer={{
          text: "Thousands of users waiting for a Articles. Start writing & earning now!.",
          tail: "Become an Author",
        }}
      />

      <TrustedSection
        title="6.3k trusted companies"
        subtitle="Nullam egestas tellus at enim ornare tristique. Class aptent taciti sociosqu ad litora torquent per conubia nostra."
        companies={companies}
      />

      <MyFooter />
    </>
  );
};

export default HomePage;
