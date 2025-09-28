import { useParams } from "react-router";
import { useEffect, useState } from "react";
import BlogDetails from "./blog_details/BlogDetails";

function BlogPage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchData = async () => {
    fetch(`https://tamkeen-dev.com/api/node/${id}?_format=json`)
      .then((res) => res.json())
      .then((json) => setData(json));
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return <BlogDetails data={data} fetchData={fetchData} />;
}

export default BlogPage;
