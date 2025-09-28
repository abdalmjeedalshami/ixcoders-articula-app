import { Col, Container, Row } from "react-bootstrap";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import colors from "../../../theme/colors";

const QuotesSection = ({ quotes }) => {
  return (
    <Container className="py-5">
      <Row>
        {quotes.map((quot, index) => (
          <Col
            md={4}
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150} // stagger animation
          >
            <div>
              <div
                className="p-4 position-relative mb-4"
                style={{ backgroundColor: colors.sectionBackground }}
              >
                <RiDoubleQuotesL color={colors.primary} size="2rem" />
                <div
                  className="text-center"
                  style={{ color: colors.blackBackground }}
                >
                  {quot.text}
                </div>
                <div className="text-end">
                  <RiDoubleQuotesR color={colors.primary} size="2rem" />
                </div>

                {/* Triangle */}
                <div
                  className="position-absolute top-100 start-50 translate-middle-x h-0 w-0"
                  style={{
                    borderLeft: "15px solid transparent",
                    borderRight: "15px solid transparent",
                    borderTop: `15px solid ${colors.sectionBackground}`,
                  }}
                />
              </div>
              <div className="text-center">
                <p>{quot.auth.name}</p>
                <p className="text-muted">
                  {quot.auth.position} of{" "}
                  <a
                    className="text-primary"
                    href={quot.auth.company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {quot.auth.company.name}
                  </a>
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default QuotesSection;
