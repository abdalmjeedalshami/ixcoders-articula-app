import { Container, Row, Col, Card } from "react-bootstrap";
import MyTag from "../../common/my_tag/MyTag";
import "./JobCard.css";
import colors from "../../../theme/colors";
import docIcon from "../../../assets/icons/doc.svg";
import clockIcon from "../../../assets/icons/clock.svg";
import chartIcon from "../../../assets/icons/bar-chart.svg";

const JobCard = ({ job }) => {
  return (
    <Col xs={12} xl={6} className="d-flex">
      <div className="job-card mb-4 rounded-0 w-100 bg-white">
        <Row className="g-0">
          {/* Image Section */}
          <Col xs={12} md={4}>
            <div className="overflow-hidden">
              <Card.Img
                src={job.image}
                alt={job.title}
                className="img-fluid rounded-0 h-100"
                style={{ objectFit: "cover", minHeight: "200px" }}
              />
            </div>
          </Col>

          {/* Text Section */}
          <Col
            xs={12}
            md={8}
            className="d-flex flex-column justify-content-between"
          >
            <div className="p-3 d-flex flex-column justify-content-start gap-3 h-100">
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <MyTag tag={job.tag} />
                <p className="m-0" style={{ color: colors.blackBackground }}>
                  {job.salary}
                  <span
                    className="month"
                    style={{ color: colors.textMuted.month }}
                  >
                    {" "}
                    / Month
                  </span>
                </p>
              </div>
              <strong style={{ color: colors.blackBackground }}>
                {job.title}
              </strong>
              <p className="m-0" style={{ color: colors.textMuted.welcome }}>
                {job.description}
              </p>
            </div>

            {/* Footer Info */}
            <Container fluid className="border-top py-2">
              <Row className="g-2">
                {[docIcon, chartIcon, clockIcon].map((icon, idx) => (
                  <Col
                    xs={12}
                    sm={4}
                    key={idx}
                    className="d-flex align-items-center gap-2"
                  >
                    <img
                      src={icon}
                      alt=""
                      className="img-fluid"
                      style={{ maxWidth: "15px" }}
                    />
                    <span>Part Time</span>
                  </Col>
                ))}
              </Row>
            </Container>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default JobCard;
