import { MdOutlineAccountCircle } from "react-icons/md";
import { Col } from "react-bootstrap";
import colors from "../../../theme/colors";
import "./articleCard.css";
import { NavLink } from "react-router";
import MyTag from "../../common/my_tag/MyTag";

const ArticleCard = ({ article }) => {
  return (
    <Col
      key={article.id}
      xs={12}
      sm={6}
      md={4}
      lg="auto"
      className="d-flex article-col mb-4"
      data-aos="fade-up"
      data-aos-duration="1500"
    >
      <NavLink
        to={`/articles/article=${article.id}`}
        className="w-100 text-decoration-none"
      >
        <div className="article-card pb-3 h-100" style={{ backgroundColor: "white" }}>
          {/* Image */}
          <div className="overflow-hidden">
            <div
              className="object-fit-cover"
              style={{
                backgroundImage: `url(${article.image})`,
                height: "150px",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>
          {/* Tag */}
          <MyTag tag={article.tag} classes={"mx-3 my-2"} />
          <p className="mx-3 article-description">{article.description}</p>
          {/* Auth */}
          <div className="border-top pt-2">
            <div className="d-flex align-items-center gap-1 mx-3">
              <MdOutlineAccountCircle color={colors.primary} />
              <p
                className="article-auth m-0"
                style={{ color: colors.textMuted.articleAuth }}
              >
                {article.auth}
              </p>
            </div>
          </div>
        </div>
      </NavLink>
    </Col>
  );
};

export default ArticleCard;
