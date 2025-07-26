import { Container, Row, Col } from "react-bootstrap";
import ArticleCard from "../../cards/article_card/ArticleCard";
import colors from "../../../theme/colors";

const LatestArticlesSection = ({ articles }) => {
  return (
    <>
      <Container
        className="py-5"
        fluid
        style={{ backgroundColor: colors.sectionBackground }}
      >
        <Container>
          <h1 className="text-center mb-4" data-aos="fade-up">
            Latest Articles
          </h1>
          <Row className="flex-wrap">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default LatestArticlesSection;
