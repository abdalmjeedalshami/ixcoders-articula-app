import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router";
import colors from "../../../theme/colors";
import "./categoryCard.css";

import { useTranslation } from "react-i18next";

const CategoryCard = ({ big, category }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <Col
      key={category.id}
      xs={12}
      sm={6}
      md={4}
      lg={3}
      className="mb-3"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-offset="200"
    >
      <NavLink
        to={`/category/${category.id}`}
        state={{ categoryName: category.name }}
        className="text-decoration-none"
      >
        <div
          className="category-card p-3 overflow-hidden h-100"
          style={{
            "--icon-hover-bg": category.color || "#222",
            "--card-bg": category.color,
            "--icon-bg": category.iconBackground || "#fff",
          }}
        >
          <Row className="g-3">
            <Col
              xs={3}
              className="d-flex justify-content-center align-items-center"
            >
              <div className="icon-wrapper p-2">
                <img src={category.image} alt={category.name} />
              </div>
            </Col>
            {big && <Col></Col>}

            <Col xs={9}>
              <p className="mb-1 fw-bold text-wrap text-capitalize">
                {category.name}
              </p>
              {!big && (
                <p className="m-0" style={{ color: colors.textMuted.category }}>
                  {category.articleCount} {isArabic ? "تقرير" : "Articles"}
                </p>
              )}
            </Col>
          </Row>
        </div>
      </NavLink>
    </Col>
  );
};

export default CategoryCard;
