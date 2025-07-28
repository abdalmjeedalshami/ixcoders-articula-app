import { Col, Row } from "react-bootstrap";
import { NavLink } from "react-router";
import colors from "../../../theme/colors";

const CategoryCard = ({ big, category }) => {
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
      <NavLink className="text-decoration-none" to={`/products/${category.id}`}>
        <div
          className="p-3 overflow-hidden h-100"
          style={{ backgroundColor: category.color }}
        >
          <Row className="g-3">
            <Col
              xs={3}
              className="d-flex justify-content-center align-items-center"
            >
              <div
                className="p-2"
                style={{
                  backgroundColor: category.iconBackground || "#fff",
                }}
              >
                <img src={category.image} alt={category.name} />
              </div>
            </Col>
            {big ? <Col></Col> : ""}

            <Col xs={9}>
              <p className="mb-1 fw-bold text-wrap">{category.name}</p>
              {big ? (
                ""
              ) : (
                <p className="m-0" style={{ color: colors.textMuted.category }}>
                  {category.articleCount} Articles
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
