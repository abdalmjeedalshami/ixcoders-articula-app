import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { Container, Row, Badge } from "react-bootstrap";
import MySpinner from "./common/mySpinner/MySpinner";
import ArticleCard from "./cards/article_card/ArticleCard";

function TagPage() {
  const { name } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
      throw new Error("Missing credentials in localStorage");
    }

    const btoaToken = btoa(`${username}:${password}`);

    fetch("https://tamkeen-dev.com/api/blogs-api?items_per_page=50", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoaToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        // Filter blogs that contain this tag
        const filtered = json.rows.filter((blog) =>
          blog.field_tags.includes(name)
        );
        setBlogs(filtered);
        setLoading(false);
      });
  }, [name]);

  if (loading) return <MySpinner />;

  return (
    <Container className="mt-5">
      <h2 className="fw-bold mb-4">
        Blogs tagged with <Badge bg="primary">#{name}</Badge>
      </h2>

      {blogs.length === 0 ? (
        <p>No blogs found with this tag.</p>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {blogs.map((blog, i) => (
            <ArticleCard article={blog} variant="detailed" articleKey={i} />
          ))}
        </Row>
      )}
    </Container>
  );
}

export default TagPage;
