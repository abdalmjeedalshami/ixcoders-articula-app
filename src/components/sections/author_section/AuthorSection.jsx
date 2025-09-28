import { Col, Container, Row } from "react-bootstrap";
import colors from "../../../theme/colors";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import TeachingStepsCard from "../../cards/teaching_steps_card/TeachingStepsCard";
import MyButton from "../../common/my_button/MyButton";
import { useTranslation } from "react-i18next";

const AuthorSection = ({ image }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <Container fluid style={{ backgroundColor: colors.sectionBackground }} className="overflow-hidden">
      <Container className="py-5">
        <Row>
          {/* Author */}
          <Col
            lg={6}
            className="mb-4"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div
              className="h-100"
              style={{
                background: "linear-gradient(to right, #CC522B, #FF6636)",
              }}
            >
              <Row>
                <Col md={7} className="py-5 ps-5 text-white">
                  <strong
                    className="fs-2"
                    data-aos="fade-down"
                    data-aos-delay="200"
                  >
                    {isArabic ? "كن مؤلفاً" : "Become an Author"}
                  </strong>

                  <p data-aos="fade-up" data-aos-delay="300">
                    {isArabic
                      ? "يُدرّس المؤلفون من جميع أنحاء العالم ملايين الطلاب على Udemy. نحن نوفر الأدوات والمهارات لتعليم ما تحب."
                      : "Authors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love."}
                  </p>

                  <div data-aos="zoom-in" data-aos-delay="400">
                    <MyButton
                      text={
                        <>
                          {isArabic ? "ابدأ الكتابة" : "Start Writing"}{" "}
                          {isArabic ? <FaArrowLeft /> : <FaArrowRight />}
                        </>
                      }
                      color={colors.primary}
                      backgroundColor="white"
                    />
                  </div>
                </Col>
                <Col
                  md={5}
                  className="overflow-hidden"
                  data-aos="fade-left"
                  data-aos-delay="500"
                >
                  <div
                    className="h-100 mt-3"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  ></div>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Steps Card */}
          <Col lg={6} className="mb-4">
            <TeachingStepsCard />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default AuthorSection;
