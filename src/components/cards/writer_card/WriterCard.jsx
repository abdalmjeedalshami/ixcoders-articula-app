import { Card, Row, Col } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import colors from "../../../theme/colors";
import "./WriterCard.css";
import { useTranslation } from "react-i18next";

const WriterCard = ({ writer }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <Card className="writer-card border rounded-0 shadow-sm text-center">
      <Card.Img
        className="rounded-0 h-75"
        variant="top"
        src={writer.image}
        alt={writer.name}
      />
      <Card.Body>
        <Card.Title className="mb-1" style={{ color: colors.blackBackground }}>
          {writer.name}
        </Card.Title>
        <Card.Text style={{ color: colors.textMuted.navbar }}>
          {writer.position}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="bg-white border-top">
        <Row className="g-5">
          <Col className="d-flex justify-content-center align-items-center gap-1">
            <FaStar className="text-warning" />
            <span style={{ color: colors.textMuted.welcome }}>
              {writer.rating}
            </span>
          </Col>
          <Col className="d-flex justify-content-center align-items-center gap-1">
            <span
              className="fw-medium"
              style={{ color: colors.textMuted.welcome }}
            >
              {writer.articlesNum}
            </span>
            <span style={{ color: colors.textMuted.navbar }}>
              {isArabic ? "تقرير" : "Articles"}
            </span>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default WriterCard;
