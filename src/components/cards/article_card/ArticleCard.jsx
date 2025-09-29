import { useState } from "react";
import { Col } from "react-bootstrap";
import { MdOutlineAccountCircle } from "react-icons/md";
import { NavLink } from "react-router";
import colors from "../../../theme/colors";
import MyTag from "../../common/my_tag/MyTag";
import MyButton from "../../common/my_button/MyButton";
import def_blog_image from "../../../../public/images/def_blog_image.jpg";
import "./articleCard.css";

const ArticleCard = ({
  article,
  variant = "simple", // "simple" (first card) | "detailed" (second card)
  articleKey = 0,
}) => {
  const [mainImage, setMainImage] = useState(
    article.field_image
      ? `https://tamkeen-dev.com${article.field_image}`
      : article.image
  );

  const galleryImages = article.field_gallery
    ? article.field_gallery
        .split(",")
        .map((imgPath) => imgPath.trim())
        .filter(Boolean)
        .map((path) => `https://tamkeen-dev.com${path}`)
    : [];

  if (variant === "simple") {
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
          <div
            className="article-card pb-3 h-100"
            style={{ backgroundColor: "white" }}
          >
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
  }

  // === Detailed variant ===
  return (
    <div
      className="col-12 col-md-6 col-lg-4"
      data-aos="fade-up"
      data-aos-delay={articleKey * 10}
      data-aos-duration="800"
      data-aos-once="true"
    >
      <div className="card h-100 shadow-sm border-0 rounded-0">
        {/* Article Image */}
        <img
          src={mainImage || def_blog_image}
          className="card-img-top rounded-0"
          alt={article.title}
          style={{ height: "200px", objectFit: "cover" }}
          onMouseLeave={() =>
            setMainImage(
              article.field_image
                ? `https://tamkeen-dev.com${article.field_image}`
                : def_blog_image
            )
          }
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = def_blog_image;
          }}
        />

        {/* Gallery Thumbnails */}
        {galleryImages.length > 0 && (
          <div
            className="d-flex px-2 pt-2"
            style={{
              gap: "0.5rem",
              overflow: "hidden",
              flexWrap: "nowrap",
            }}
          >
            {galleryImages.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Gallery image ${idx + 1}`}
                style={{
                  height: "60px",
                  width: "60px",
                  objectFit: "cover",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: idx < 5 ? "block" : "none",
                }}
                onMouseEnter={() => setMainImage(imgUrl)}
                onClick={() => window.open(imgUrl, "_blank")}
              />
            ))}

            {galleryImages.length > 5 && (
              <div
                style={{
                  height: "60px",
                  width: "60px",
                  borderRadius: "4px",
                  background: "#eee",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.8rem",
                  color: "#555",
                  cursor: "pointer",
                }}
                onClick={() => window.openGallery && window.openGallery()}
              >
                +{galleryImages.length - 5}
              </div>
            )}
          </div>
        )}

        {/* Card Body */}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title fw-bold">{article.title}</h5>
          <p className="text-muted small mb-2">
            By {article.author} ·{" "}
            {new Date(article.created).toLocaleDateString()}
          </p>
          <p className="card-text flex-grow-1">
            {article.body?.length > 100
              ? `${article.body.substring(0, 100)}...`
              : article.body}
          </p>

          {/* Tags */}
          {article.field_tags?.length > 0 && (
            <div className="mb-2">
              {article.field_tags.map((tag, index) => (
                <span
                  key={index}
                  className="badge me-1 rounded-0"
                  style={{
                    fontSize: "0.75rem",
                    backgroundColor: colors.primary,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Read More Button */}
          <MyButton
            route={`/blog/${article.id}`}
            text="Read More"
            color={colors.primary}
            backgroundColor={colors.secondary}
            hoverColor="white"
            hoverBackgroundColor={colors.primary}
          />
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
