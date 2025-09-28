import MyBreadcrumb from "../../components/common/my_breadcrumb/MyBreadcrumb";
import { Container, Row, Col } from "react-bootstrap";
import MyAccordion from "../../components/common/my_accordion/MyAccordion";
import MyListGroup from "../../components/common/my_list_group/MyListGroup";
import MyForm from "../../components/common/my_form/MyForm";
import colors from "../../theme/colors";
import MyFooter from "../../components/layout/my_footer/MyFooter";
import { useEffect, useState } from "react";
import MySpinner from "../../components/common/mySpinner/MySpinner";

const breadcrumbPath = [
  { label: "Home", to: "/" },
  { label: "FAQs", to: "/faqs" },
];

const fields = [
  {
    name: "subject",
    label: "",
    type: "text",
    placeholder: "Subject",
  },
  {
    name: "message",
    label: "",
    type: "textarea",
    placeholder: "Message",
  },
];

const Faqs = () => {
  const [accordionList, setAccordionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://tamkeen-dev.com/api/faq-list", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch FAQs");
        return response.json();
      })
      .then((data) => {
        setAccordionList(data);
      })
      .catch((e) => {
        console.error("FAQ fetch error:", e);
        setError("Unable to load FAQs. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <MyBreadcrumb title={"FAQs"} path={breadcrumbPath} />
      <p className="fs-1 fw-bold text-center my-5">
        Frequently asked questions
      </p>
      <Container className="mb-5">
        <Row>
          <Col md={3}>
            <MyListGroup />
          </Col>
          <Col md={6}>
            {loading ? (
              <MySpinner />
            ) : error ? (
              <div className="text-danger text-center py-5">{error}</div>
            ) : (
              <MyAccordion list={accordionList} />
            )}
          </Col>

          <Col md={3}>
            <div
              className="p-3 fs-3"
              style={{ backgroundColor: colors.sectionBackground }}
            >
              <p
                className="mb-2 fs-5"
                style={{
                  color: colors.blackBackground,
                }}
              >
                Don’t find your answer!
              </p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: colors.textMuted.navbar,
                }}
              >
                Don’t worry, write your question here and our support team will
                help you.
              </p>
              <MyForm fields={fields} buttonText="Submit Question" />
            </div>
          </Col>
        </Row>
      </Container>

      <MyFooter />
    </>
  );
};

export default Faqs;
