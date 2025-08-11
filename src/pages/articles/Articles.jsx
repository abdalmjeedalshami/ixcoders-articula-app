import React, { useEffect, useState } from "react";
import colors from "../../theme/Colors";
import ArticleCard2 from "../../components/cards/ArticleCard/ArticleCard2";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        const btoaToken = btoa(username + ":" + password);

        const response = await fetch(
          "https://tamkeen-dev.com/api/blogs-api?items_per_page=5",
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

  if (loading) return <p>Loading articles...</p>;

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
