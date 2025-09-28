import { useState } from "react";
import colors from "../../../theme/colors";
import MyButton from "../../common/my_button/MyButton";
import def_blog_image from "../../../../public/images/def_blog_image.jpg";

const ArticleCard = ({ article, articleKey }) => {
  const [mainImage, setMainImage] = useState(
    `https://tamkeen-dev.com${article.field_image}`
  );

  const galleryImages = article.field_gallery
    ? article.field_gallery
        .split(",")
        .map((imgPath) => imgPath.trim())
        .filter(Boolean)
        .map((path) => `https://tamkeen-dev.com${path}`)
    : [];

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
          src={mainImage || def_blog_image} // fallback if mainImage is empty
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
            e.target.onerror = null; // prevent infinite loop
            e.target.src = def_blog_image; // fallback image
          }}
        />

        {/* Gallery Thumbnails - Single Row */}
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
                  borderRadius: "4px",
                  cursor: "pointer",
                  flexShrink: 0,
                  display: idx < 5 ? "block" : "none", // show only first 5 thumbnails
                }}
                onMouseEnter={() => setMainImage(imgUrl)}
                onClick={() => window.open(imgUrl, "_blank")}
              />
            ))}

            {/* Optional: show "+N more" indicator */}
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
                onClick={() => window.openGallery && window.openGallery()} // optional callback
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
            {article.body.length > 100
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
