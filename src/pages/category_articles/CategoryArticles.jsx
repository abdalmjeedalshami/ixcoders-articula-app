import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ArticleCard from "../../components/cards/article_card/ArticleCard";
import { fetchArticles } from "../../utils/blog";

export default function CategoryArticles() {
  const { id } = useParams(); // ✅ get category ID from URL
  const [categoryName, setCategoryName] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch category name from both APIs
  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const [catRes, faqCatRes] = await Promise.all([
          fetch("https://tamkeen-dev.com/api/terms/category"),
          fetch("https://tamkeen-dev.com/api/terms/faq-category"),
        ]);

        if (!catRes.ok || !faqCatRes.ok) {
          throw new Error("Failed to fetch category data");
        }

        const [catData, faqCatData] = await Promise.all([
          catRes.json(),
          faqCatRes.json(),
        ]);

        const allCategories = [...catData, ...faqCatData];
        const match = allCategories.find((c) => c.id === id);

        if (match) {
          setCategoryName(match.name);
        } else {
          setCategoryName("Unknown Category");
        }
      } catch (err) {
        console.error(err);
        setCategoryName("Unknown Category");
      }
    };

    fetchCategoryName();
  }, [id]);

  // Fetch articles for this category
  useEffect(() => {
    fetchArticles({ setArticles: setArticles, setLoading: setLoading, category: id });
  }, [id]);

  return (
    <div className="container py-4">
      <h2>Articles in {categoryName}</h2>

      {loading && <p>Loading articles...</p>}
      {error && <p className="text-danger">{error}</p>}

      {!loading && !error && articles.length === 0 && (
        <p>No articles found for this category.</p>
      )}

      <div className="row">
        {articles.map((article, index) => (
          <ArticleCard article={article} variant="detailed" articleKey={index} />
        ))}
      </div>
    </div>
  );
}
