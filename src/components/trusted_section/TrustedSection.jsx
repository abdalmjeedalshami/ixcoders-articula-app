import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const TrustedSection = ({ companies }) => {
  return (
    <Container fluid className="py-5">
      <Container>
        <Row>
          {/* Left Text Section */}
          <Col xs={12} lg={4} className="mb-4 mb-lg-0">
            <div className="d-flex flex-column justify-content-center h-100">
              <p className="fw-bold fs-3 text-center text-lg-start">
                6.3k trusted companies
              </p>
              <p className="text-center text-lg-start">
                Nullam egestas tellus at enim ornare tristique. Class aptent
                taciti sociosqu ad litora torquent per conubia nostra.
              </p>
            </div>
          </Col>

          {/* Company Logos Section */}
          <Col xs={12} lg={8}>
            <Row>
              {companies.map((company) => (
                <Col
                  key={company.id}
                  xs={6}
                  sm={4}
                  md={3}
                  className="mb-3 d-flex justify-content-center"
                >
                  <div className="shadow py-3 px-2 w-100 h-100 d-flex align-items-center justify-content-center">
                    <img
                      src={company.image}
                      alt={company.name || "Company logo"}
                      className="img-fluid"
                      style={{ maxHeight: "60px" }}
                    />
                  </div>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default TrustedSection;
