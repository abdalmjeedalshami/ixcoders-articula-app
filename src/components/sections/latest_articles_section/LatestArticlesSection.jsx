import { Container, Row, Col } from "react-bootstrap";
import colors from "../../../theme/colors";
import { useTranslation } from "react-i18next";
import ArticleCard from "../../cards/article_card/ArticleCard";

const LatestArticlesSection = ({ articles }) => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";
  return (
    <>
      <Container
        className="py-5"
        fluid
        style={{ backgroundColor: colors.sectionBackground }}
      >
        <Container>
          <h1 className="text-center mb-4" data-aos="fade-up">
            {isArabic ? "أحدث المقالات" : "Latest Articles"}
          </h1>
          <Row className="flex-wrap">
            {articles.map((article) => (
              <ArticleCard article={article} variant="simple" />
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default LatestArticlesSection;
