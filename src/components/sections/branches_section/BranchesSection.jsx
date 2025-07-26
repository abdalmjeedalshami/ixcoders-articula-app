import colors from "../../../theme/colors";
import { Col, Container, Row } from "react-bootstrap";

const BranchesSection = ({ title, subtitle, branches }) => {
  return (
    <div className="text-center py-5">
      <strong className="fs-1" style={{ color: colors.blackBackground }}>
        {title}
      </strong>
      <p className="mb-4" style={{ color: colors.textMuted.welcome }}>
        {subtitle}{" "}
      </p>
      <Container>
        <Row>
          {branches.map((branch) => (
            <Col key={branch.id} md={3}>
              <div
                className="p-3 text-center d-flex align-items-end"
                style={{
                  height: "400px",
                  background: `url(${branch.image})`,
                  backgroundPosition: "cetner",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="py-3 px-5 bg-white">
                  {branch.isMain && (
                    <p
                      className="mb-1 text-capitalize fw-bold"
                      style={{ color: colors.primary, fontSize: ".7rem" }}
                    >
                      mAIN BRANCHE
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
