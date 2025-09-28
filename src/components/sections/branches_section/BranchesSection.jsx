import colors from "../../../theme/colors";
import { Col, Container, Row } from "react-bootstrap";

const BranchesSection = ({ title, subtitle, branches }) => {
  return (
    <div className="text-center py-5">
      <strong
        className="fs-1"
        style={{ color: colors.blackBackground }}
        data-aos="fade-down"
      >
        {title}
      </strong>
      <p
        className="mb-4"
        style={{ color: colors.textMuted.welcome }}
        data-aos="fade-up"
        data-aos-delay={100}
      >
        {subtitle}
      </p>

      <Container>
        <Row>
          {branches.map((branch, index) => (
            <Col
              key={branch.id}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
              data-aos="fade-up"
              data-aos-delay={index * 150} // staggered effect
            >
              <div
                className="p-3 text-center d-flex justify-content-center align-items-end"
                style={{
                  height: "350px",
                  background: `url(${branch.image}) center / cover no-repeat`,
                }}
              >
                <div
                  className="py-3 px-4 bg-white w-100"
                  style={{ maxWidth: "90%" }}
                >
                  {branch.isMain && (
                    <p
                      className="mb-1 text-capitalize fw-bold"
                      style={{ color: colors.primary, fontSize: ".75rem" }}
                    >
                      Main Branch
                    </p>
                  )}
                  <p
                    className="mb-2 fw-bold"
                    style={{ color: colors.blackBackground }}
                  >
                    {branch.location}
                  </p>
                  <p
                    className="m-0"
                    style={{
                      color: colors.textMuted.category,
                      fontSize: ".85rem",
                    }}
                  >
                    {branch.desc}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default BranchesSection;
