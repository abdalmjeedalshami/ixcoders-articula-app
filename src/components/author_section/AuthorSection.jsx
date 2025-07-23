import { Col, Container, Row } from "react-bootstrap";
import MyButton from "../my_button/MyButton";
import colors from "../../theme/colors";
import { FaArrowRight } from "react-icons/fa6";
import TeachingStepsCard from "../teaching_steps_card/TeachingStepsCard";

const AuthorSection = ({ image }) => {
  return (
    <Container fluid style={{ backgroundColor: colors.sectionBackground }}>
      <Container className="py-5">
        <Row>
          {" "}
          {/* Add margin between columns */}
          {/* Author */}
          <Col lg={6} className="mb-4">
            <div
              className="h-100"
              style={{
                background: "linear-gradient(to right, #CC522B, #FF6636)",
              }}
            >
              <Row>
                <Col md={7} className="py-5 ps-5 text-white">
                  <strong className="fs-2">Become an Author</strong>
                  <p>
                    Authors from around the world teach millions of students on
                    Udemy. We provide the tools and skills to teach what you
                    love.
                  </p>
                  <MyButton
                    text={
                      <>
                        Start Writing <FaArrowRight />
                      </>
                    }
                    color={colors.primary}
                    backgroundColor="white"
                  />
                </Col>
                <Col md={5} className="overflow-hidden">
                  <div
                    className="h-100 mt-3"
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      // minHeight: "250px", // fallback height
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
