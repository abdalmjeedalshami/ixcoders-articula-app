import { Col, Container, Row } from "react-bootstrap";
import colors from "../../../theme/colors";
import "./TrustedSection.css";

const TrustedSection = ({ title, subtitle, companies }) => {

  return (
    <Container fluid className="py-5 bg-white overflow-hidden">
      <Container>
        <Row>
          {/* Left Text Section */}
          <Col xs={12} lg={4} className="mb-4 mb-lg-0" data-aos="fade-right">
            <div className="d-flex flex-column justify-content-center h-100 px-5">
              <p
                className="fw-bold fs-3 "
                style={{ color: colors.blackBackground }}
              >
                {title}
              </p>
              <p
                className=""
                style={{ fontSize: "1rem", color: colors.textMuted.category }}
              >
                {subtitle}
              </p>
            </div>
          </Col>

          {/* Company Logos Section */}
          <Col xs={12} lg={8}>
            <div className="h-100 d-flex align-items-center">
              <Row>
                {companies.map((company, index) => (
                  <Col
                    key={company.id}
                    xs={6}
                    sm={4}
                    md={3}
                    className="mb-3 d-flex justify-content-center"
                    data-aos="zoom-in"
                    data-aos-delay={index * 50} // stagger logos
                  >
                    <a href={company.url} className="w-100" style={{maxHeight: "7rem"}}>
                      <div className="company-card shadow py-5 px-2 w-100 h-100 d-flex align-items-center justify-content-center">
                        <img
                          src={company.image}
                          alt={company.name || "Company logo"}
                          className="img-fluid"
                          style={{ maxHeight: "60px" }}
                        />
                      </div>
                    </a>
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default TrustedSection;
