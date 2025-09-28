import { Container, Row, Col } from "react-bootstrap";
import { FaUsers, FaGlobe, FaBuilding } from "react-icons/fa";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";
import colors from "../../../theme/colors";

const stats = [
  {
    icon: <FaUsers size={32} color="#f36a3e" />,
    number: "67.1k",
    label: "Students",
  },
  {
    icon: <MdOutlineLibraryBooks size={32} color="#685eff" />,
    number: "26k",
    label: "Certified Instructor",
  },
  {
    icon: <FaGlobe size={32} color="#f14141" />,
    number: "72",
    label: "Country Language",
  },
  {
    icon: <AiOutlineCheckCircle size={32} color="#2bd67b" />,
    number: "99.9%",
    label: "Success Rate",
  },
  {
    icon: <FaBuilding size={32} color="#f36a3e" />,
    number: "57",
    label: "Trusted Companies",
  },
];

const StatsSection = () => {
  return (
    <Container className="py-5">
      <Row className="justify-content-between">
        {stats.map((stat, index) => (
          <Col
            key={index}
            xs={6}
            md={2}
            className="mb-4"
            data-aos="fade-up"
            data-aos-delay={index * 150} // stagger each stat
          >
            <div className="mb-2 d-flex gap-3">
              <div>{stat.icon}</div>
              <div>
                <p
                  className="mb-1 fw-bold d-flex align-items-center fs-3"
                  style={{
                    lineHeight: "30px",
                    color: colors.blackBackground,
                  }}
                >
                  {stat.number}
                </p>
                <p
                  className="text-muted m-0"
                  style={{ color: colors.textMuted.welcome }}
                >
                  {stat.label}
                </p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default StatsSection;
