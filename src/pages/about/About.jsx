import { Col, Container, Row } from "react-bootstrap";
import MyBreadcrumb from "../../components/common/my_breadcrumb/MyBreadcrumb";
import colors from "../../theme/colors";
import TrustedSection from "../../components/sections/trusted_section/TrustedSection";
import companyLogo from "../../assets/icons/AMG.CO.svg";
import StatsSection from "../../components/sections/stats_section/StatsSection";
import partnerImage from "../../assets/images/partner.png";
import GallerySection from "../../components/sections/gallery_section/GallerySection";
import QuotesSection from "../../components/sections/quotes_section/QuotesSection";
import MyFooter from "../../components/layout/my_footer/MyFooter";
import BasicSection from "../../components/sections/basic_section/BasicSection";
import menImage from "../../assets/images/men.jpg";
import MyLine from "../../components/common/my_line/MyLine";
import { Helmet } from "react-helmet";

const quotes = [
  {
    text: "Eduguard fit us like a glove. Their team curates fresh, up-to-date courses from their marketplace and makes them available to customers.",
    auth: {
      name: "Sundar Pichai",
      company: {
        name: "Google",
        url: "https://www.google.com",
      },
      position: "Chief Chairman",
    },
  },
  {
    text: "Edugaurd responds to the needs of the business in an agile and global manner. It’s truly the best solution for our employees and their careers.",
    auth: {
      name: "Satya Nadella",
      company: {
        name: "Microsoft",
        url: "https://www.microsoft.com/",
      },
      position: "CEO",
    },
  },
  {
    text: "In total, it was a big success, I would get emails about what a fantastic resource it was.",
    auth: {
      name: "Ted Sarandos",
      company: {
        name: "Netflix",
        url: "https://www.netflix.com/",
      },
      position: "Chief Executive Officer",
    },
  },
];

const breadcrumbPath = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Articula</title>
        <meta name="description" content="Learn more about us" />
      </Helmet>
      <MyBreadcrumb title={"About"} path={breadcrumbPath} />
      <BasicSection
        classes={"mb-5"}
        split
        text={{
          date: "2011-2025",
          title: "We share knowledge with the world",
          desc: "Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent fermentum quam mauris. Fusce tempor et augue a aliquet. Donec non ipsum non risus egestas tincidunt at vitae nulla.",
        }}
        image={menImage}
      />
      <MyLine color={""} />
      <TrustedSection
        title="We Just keep growing with 6.3k Companies"
        subtitle="Nullam egestas tellus at enim ornare tristique. Class aptent taciti sociosqu ad litora torquent"
        companies={[
          {
            id: 1,
            url: "/about",
            image: companyLogo,
          },
          {
            id: 2,
            url: "/",
            image: companyLogo,
          },
          {
            id: 3,
            url: "",
            image: companyLogo,
          },
          {
            id: 4,
            url: "",
            image: companyLogo,
          },
          {
            id: 5,
            url: "",
            image: companyLogo,
          },
          {
            id: 6,
            url: "",
            image: companyLogo,
          },
          {
            id: 7,
            url: "",
            image: companyLogo,
          },
          {
            id: 8,
            url: "",
            image: companyLogo,
          },
        ]}
      />
      <StatsSection />

      <section className="overflow-hidden" style={{ backgroundColor: colors.backgrounds.about }}>
        <Container>
          <Row>
            <Col md={6} data-aos="fade-right" data-aos-delay="100">
              <div
                className="mx-auto h-100"
                style={{
                  background: `url(${partnerImage})`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "top",
                  height: "300px",
                  width: "400px",
                }}
              ></div>
            </Col>

            <Col md={6} data-aos="fade-left" data-aos-delay="200">
              <div className="px-5 my-5">
                <p className="m-0" style={{ color: colors.primary }}>
                  OUR ONE BILLION MISSION
                </p>
                <p
                  className="fs-1 fw-bold"
                  style={{ color: colors.blackBackground }}
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  Our one billion mission sounds bold, We agree.
                </p>
                <p
                  style={{
                    fontSize: "1rem",
                    color: colors.textMuted.welcome,
                  }}
                  data-aos="fade-up"
                  data-aos-delay="400"
                >
                  "We cannot solve our problems with the same thinking we used
                  when we created them."—Albert Einstein. Institutions are slow
                  to change. Committees are where good ideas and innovative
                  thinking go to die. Choose agility over dogma. Embrace and
                  drive change. We need to wipe the slate clean and begin with
                  bold, radical thinking.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <GallerySection />
      <QuotesSection quotes={quotes} />
      <MyFooter />
    </>
  );
};

export default About;
