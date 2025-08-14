import React, { useEffect, useState } from "react";
import colors from "../../theme/Colors";
import ArticleCard2 from "../../components/cards/ArticleCard/ArticleCard2";
import { fetchArticles } from "../../utils/blog";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles({ setArticles, setLoading });
  }, []);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Articles...</span>
        </div>
        <p className="mt-3 fs-6 text-muted">Loading Articles…</p>
      </div>
    );

  return (
    <div className="container p-5">
      <h1 className="mb-4 fw-bold">Articles</h1>
      {articles.length > 0 ? (
        <div className="row g-4">
          {articles.map((article) => (
            <ArticleCard2 article={article} />
          ))}
        </div>
      ) : (
        <p>No articles found.</p>
      )}
    </div>
  );
};

export default Articles;
