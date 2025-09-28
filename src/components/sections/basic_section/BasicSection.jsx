import { Container, Row, Col } from "react-bootstrap";
import colors from "../../../theme/colors";
import SplitBackground from "../../../components/common/split_background/SplitBackground";
import MyButton from "../../common/my_button/MyButton";
import { FaCheckCircle } from "react-icons/fa";

const BasicSection = ({
  backgroundColor,
  reversed,
  split,
  text,
  button,
  image,
  classes,
  checkedList,
}) => {
  const { date, title, desc } = text;


  return (
    <div className="overflow-hidden" style={{ backgroundColor: backgroundColor }}>
      <Container className={`pt-5 ${classes}`}>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={6}
            className={`${
              reversed ? "order-md-first" : "order-md-last"
            } order-first mt-4 mt-md-0`}
            data-aos={reversed ? "fade-right" : "fade-left"} // image animation
            data-aos-duration="800"
          >
            {split ? (
              <SplitBackground image={image} />
            ) : (
              <div
                style={{
                  height: "300px",
                  backgroundImage: `url(${image})`,
                  backgroundSize: "contain",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat",
                }}
              ></div>
            )}
          </Col>

          <Col
            xs={12}
            md={6}
            className="text-center text-md-start"
            data-aos="fade-up" // text animation
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <div className="h-100 d-flex flex-column justify-content-center px-3 px-md-5 py-4">
              <p
                className="mb-0 fw-bold"
                style={{
                  fontSize: "4rem",
                  color: colors.textMuted.aboutHeader,
                }}
              >
                {date}
              </p>
              <p
                style={{
                  fontSize: "2rem",
                  color: colors.blackBackground,
                  lineHeight: "2.5rem",
                  fontWeight: "bold",
                }}
              >
                {title}
              </p>
              <p className="fs-6" style={{ color: colors.textMuted.category }}>
                {desc}
              </p>
              {button && (
                <div className="mt-3" data-aos="zoom-in" data-aos-delay="400">
                  <MyButton text={button.text} />
                </div>
              )}
              {checkedList &&
                checkedList.map((item, index) => (
                  <Row
                    key={index}
                    data-aos="fade-up"
                    data-aos-delay={500 + index * 100}
                  >
                    <Col md={12}>
                      <div className="bg-white p-4 mb-3">
                        <Row>
                          <Col md={1}>
                            <FaCheckCircle
                              color={colors.checkColor}
                              size={"2rem"}
                            />
                          </Col>
                          <Col md={11}>
                            <p className="fw-bold">{item.title}</p>
                            <p>{item.desc}</p>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BasicSection;
