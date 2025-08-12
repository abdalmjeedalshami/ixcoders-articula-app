import { useEffect, useState } from "react";
import colors from "../../theme/colors";
import { useNavigate } from "react-router";

const MyArticles = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        const btoaToken = btoa(username + ":" + password);

        const response = await fetch(
          "https://tamkeen-dev.com/api/blogs-api-current-user",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Basic ${btoaToken}`,
            },
          }
        );

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setArticles(data.rows);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Your Articles...</span>
        </div>
        <p className="mt-3 fs-6 text-muted">Loading Your Articles…</p>
      </div>
    );

  return (
    <div className="container p-5">
      <h1 className="mb-4 fw-bold">My Articles</h1>
      {articles.length > 0 ? (
        <div className="row g-4">
          {articles.map((article) => (
            <div className="col-12 col-md-6 col-lg-4" key={article.id}>
              <div className="card h-100 shadow-sm border-0 rounded-0">
                {/* Article Image */}
                <img
                  src={`https://tamkeen-dev.com${article.field_image}`}
                  className="card-img-top rounded-0"
                  alt={article.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />

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
          ))}
        </div>
      ) : (
        <p>No articles found.</p>
      )}
      <div className="text-center">
        <button
          onClick={() => {
            navigate("/create_blog");
          }}
        >
          Create Blog
        </button>
      </div>
    </div>
  );
};

export default MyArticles;
