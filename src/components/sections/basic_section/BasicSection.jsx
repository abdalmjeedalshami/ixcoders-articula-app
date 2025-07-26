import { Container, Row, Col } from "react-bootstrap";
import colors from "../../../theme/colors";
import SplitBackground from "../../../components/common/split_background/SplitBackground";
import MyButton from "../../common/my_button/MyButton";

const BasicSection = ({ split, text, button, image, classes }) => {
  const { date, title, desc } = text;

  return (
    <div>
      <Container className={`pt-5 ${classes}`}>
        <Row className="align-items-center">
          {/* Image column first on mobile */}
          <Col
            xs={12}
            md={6}
            className="order-first order-md-last mt-4 mt-md-0"
          >
            {!split ? (
              <div
                style={{
                  height: "300px",
                  backgroundImage: `url(${image})`,
                  backgroundSize: "contain",
                  backgroundPosition: "top",
                  backgroundRepeat: "no-repeat"
                }}
              ></div>
            ) : (
              <SplitBackground image={image} />
            )}
          </Col>

          <Col xs={12} md={6} className="text-center text-md-start">
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
                <div className="mt-3">
                  <MyButton text={button.text} />
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BasicSection;
