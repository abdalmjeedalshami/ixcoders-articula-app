import { Col, Container, Row } from "react-bootstrap";
import colors from "../../../theme/colors";
import "./welcomSection.css";
import MyButton from "../../common/my_button/MyButton";
import { useTranslation } from "react-i18next";

const WelcomeSection = ({ title, subtitle, image }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <Container
      fluid
      style={{
        background: `linear-gradient(to top, ${colors.muted_background}, white)`,
      }}
    >
      <Row className="overflow-hidden">
        <Col
          md={6}
          className="order-2 order-md-1 d-flex flex-column justify-content-center gap-4 p-5"
          data-aos={document.dir === "rtl" ? "fade-left" : "fade-right"}
          data-aos-duration="1500"
        >
          <h1 className="fw-bold">{title}</h1>
          <p style={{ color: colors.textMuted.welcome }}>{subtitle}</p>
          <div>
            <MyButton
              classes="me-2"
              text={isArabic ? "ابدأ القراءة" : "Start Reading"}
              color={colors.white}
              backgroundColor={colors.blackBackground}
            />
            {localStorage.getItem("token") ? (
              ""
            ) : (
              <MyButton
                text={isArabic ? "إنشاء حساب" : "Create Account"}
                color={colors.secondary}
                backgroundColor={colors.primary}
                route="/login"
              />
            )}
          </div>
        </Col>

        <Col
          md={6}
          className="order-1 order-md-2 p-0 d-flex flex-column justify-content-end align-items-start"
        >
          <img
            src={image}
            className="skew-left img-fluid"
            alt="welcome image"
            data-aos={document.dir === "rtl" ? "fade-right" : "fade-left"}
            data-aos-duration="1500"
          />
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomeSection;
