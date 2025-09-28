import { Container, Col, Row } from "react-bootstrap";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import colors from "../../../theme/colors";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

const MySection = ({
  backgroundColor = "white",
  isCard,
  header,
  body,
  footer,
}) => {
  const { i18n } = useTranslation();

  return (
    <div style={{ backgroundColor: backgroundColor }}>
      <Container
        fluid={isCard}
        className="py-5 overflow-hidden"
        style={{
          ...(isCard && {
            backgroundImage: `linear-gradient(to top, white 70%, white 30%, ${colors.sectionBackground} 30%, ${colors.sectionBackground} 100%)`,
            backgroundRepeat: "no-repeat",
          }),
        }}
      >
        <div className={`${isCard ? "container" : ""}`}>
          <div
            className={`${isCard ? "container" : ""} p-5`}
            style={{
              ...(isCard && {
                border: `1px solid ${colors.borderAbsolutCard}`,
                backgroundColor: "white",
              }),
            }}
          >
            {/* Title */}
            <Row>
              <Col
                md={header.subtitle ? 6 : 12}
                className={`fs-1 mb-4 d-flex align-items-center ${
                  !header.subtitle ? "justify-content-center" : ""
                }`}
              >
                <p className="fw-bold">{header.title}</p>
              </Col>
              {header.subtitle && (
                <Col md={6} className="mb-4 d-flex align-items-center">
                  {header.subtitle}
                </Col>
              )}
            </Row>
            {/* Body */}
            {body}
            {/* Footer */}
            {footer ? (
              <div
                className="text-center mt-3"
                style={{ color: colors.textMuted.welcome }}
              >
                <p className="mb-3 d-inline-flex me-2" data-aos="fade-up">
                  {footer.text}
                </p>
                <div className="d-inline-flex " data-aos="fade-left">
                  <NavLink
                    className="text-decoration-none"
                    to={footer.tail.route}
                    style={{ color: colors.primary }}
                    data-aos="fade-left"
                    data-aos-duration="1500"
                    data-aos-offset="200"
                  >
                    {`${footer.tail.text}`}{" "}
                    {i18n.language != "en" ? <FaArrowLeft /> : <FaArrowRight />}
                  </NavLink>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MySection;
