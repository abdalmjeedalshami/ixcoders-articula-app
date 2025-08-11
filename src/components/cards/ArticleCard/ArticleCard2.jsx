import { useState } from "react";
import colors from "../../../theme/colors";

const ArticleCard2 = ({ article }) => {
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
    <div className="col-12 col-md-6 col-lg-4" key={article.id}>
      <div className="card h-100 shadow-sm border-0 rounded-0">
        {/* Article Image */}
        <img
          src={mainImage}
          className="card-img-top rounded-0"
          alt={article.title}
          style={{ height: "200px", objectFit: "cover" }}
          onMouseLeave={() =>
            setMainImage(`https://tamkeen-dev.com${article.field_image}`)
          }
        />

        {/* Gallery Thumbnails */}
        {galleryImages.length > 0 && (
          <div
            className="d-flex overflow-auto px-2 pt-2"
            style={{ gap: "0.5rem", scrollbarWidth: "thin" }}
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
                }}
                onMouseEnter={() => setMainImage(imgUrl)}
                onClick={() => window.open(imgUrl, "_blank")}
              />
            ))}
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
          <a
            href={`/articles/${article.id}`}
            className="btn btn-outline mt-auto rounded-0"
            style={{ borderColor: colors.primary }}
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard2;
