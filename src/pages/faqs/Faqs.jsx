import MyBreadcrumb from "../../components/common/my_breadcrumb/MyBreadcrumb";
import { Container, Row, Col } from "react-bootstrap";
import MyAccordion from "../../components/common/my_accordion/MyAccordion";
import MyListGroup from "../../components/common/my_list_group/MyListGroup";
import MyForm from "../../components/common/my_form/MyForm";
import colors from "../../theme/colors";
import MyFooter from "../../components/layout/my_footer/MyFooter";

const breadcrumbPath = [
  { label: "Home", to: "/" },
  { label: "FAQs", to: "/faqs" },
];

const accordionList = [
  {
    title: "Fusce placerat interdum magna, ut ultrices odio pharetra pulvinar.",
    content:
      "Aliquam semper tellus vel lacus rutrum mollis. Nunc vitae iaculis lacus, id fringilla leo. Nulla dictum, enim nec bibendum auctor, lorem mi rutrum urna, sed luctus urna nibh sit amet velit. Sed varius sem semper leo ultricies tincidunt. Etiam id ligula ut augue auctor molestie ut quis felis.",
  },
  {
    title: "Proin lacinia lobortis metus, ut faucibus eros ullamcorper et.",
    content:
      "Aliquam semper tellus vel lacus rutrum mollis. Nunc vitae iaculis lacus, id fringilla leo. Nulla dictum, enim nec bibendum auctor, lorem mi rutrum urna, sed luctus urna nibh sit amet velit. Sed varius sem semper leo ultricies tincidunt. Etiam id ligula ut augue auctor molestie ut quis felis.",
  },
  {
    title:
      "Etiam a nisl dui. Integer sed eros sed leo blandit interdum eget nec",
    content:
      "Aliquam semper tellus vel lacus rutrum mollis. Nunc vitae iaculis lacus, id fringilla leo. Nulla dictum, enim nec bibendum auctor, lorem mi rutrum urna, sed luctus urna nibh sit amet velit. Sed varius sem semper leo ultricies tincidunt. Etiam id ligula ut augue auctor molestie ut quis felis.",
  },
  {
    title: "Nulla id ligula ligula. ",
    content:
      "Aliquam semper tellus vel lacus rutrum mollis. Nunc vitae iaculis lacus, id fringilla leo. Nulla dictum, enim nec bibendum auctor, lorem mi rutrum urna, sed luctus urna nibh sit amet velit. Sed varius sem semper leo ultricies tincidunt. Etiam id ligula ut augue auctor molestie ut quis felis.",
  },
  {
    title: "Etiam non tellus non dolor suscipit vehicula. ",
    content:
      "Aliquam semper tellus vel lacus rutrum mollis. Nunc vitae iaculis lacus, id fringilla leo. Nulla dictum, enim nec bibendum auctor, lorem mi rutrum urna, sed luctus urna nibh sit amet velit. Sed varius sem semper leo ultricies tincidunt. Etiam id ligula ut augue auctor molestie ut quis felis.",
  },
  {
    title: "Vestibulum pellentesque ex magna.",
    content:
      "Aliquam semper tellus vel lacus rutrum mollis. Nunc vitae iaculis lacus, id fringilla leo. Nulla dictum, enim nec bibendum auctor, lorem mi rutrum urna, sed luctus urna nibh sit amet velit. Sed varius sem semper leo ultricies tincidunt. Etiam id ligula ut augue auctor molestie ut quis felis.",
  },
  {
    title: "Ut ullamcorper est sit amet quam aliquet mattis.",
    content:
      "Aliquam semper tellus vel lacus rutrum mollis. Nunc vitae iaculis lacus, id fringilla leo. Nulla dictum, enim nec bibendum auctor, lorem mi rutrum urna, sed luctus urna nibh sit amet velit. Sed varius sem semper leo ultricies tincidunt. Etiam id ligula ut augue auctor molestie ut quis felis.",
  },
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

const handleSubmit = (data) => {
  console.log("Form submitted:", data);
};

const Faqs = () => {
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
            <MyAccordion list={accordionList} />
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
              <MyForm
                fields={fields}
                onSubmit={handleSubmit}
                buttonText="Submit Question"
              />
            </div>
          </Col>
        </Row>
      </Container>

      <MyFooter />
    </>
  );
};

export default Faqs;
