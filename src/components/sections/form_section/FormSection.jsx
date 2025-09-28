import { Container, Row, Col, Form, Button } from "react-bootstrap";
import colors from "../../../theme/colors";
import MyButton from "../../common/my_button/MyButton";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import MyForm from "../../common/my_form/MyForm";

const fields = [
  {
    row: true,
    fields: [
      { name: "firstName", label: "First Name", placeholder: "John" },
      { name: "lastName", label: "Last Name", placeholder: "Doe" },
    ],
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "subject",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Type your message...",
  },
];

const handleSubmit = (data) => {
  console.log("Contact form submitted:", data);
};

const FormSection = () => {
  return (
    <div className="py-5 overflow-hidden" style={{ backgroundColor: colors.sectionBackground }}>
      {" "}
      {/* Light grey background */}
      <Container>
        {/* Main Title */}
        <Row className="mb-1 text-center">
          <Col data-aos="fade-down">
            <p
              className="fs-1"
              style={{
                fontWeight: "bold",
                color: colors.blackBackground,
              }}
            >
              Contact Us
            </p>
          </Col>
        </Row>

        <Row className="flex-column-reverse flex-md-row">
          {/* Left Column: Contact Details */}
          <Col
            md={6}
            className="pe-md-5"
            data-aos="fade-right"
            data-aos-delay={100}
          >
            {" "}
            {/* Padding to the right for separation */}
            <p
              className="fs-4 mb-4"
              style={{
                color: colors.blackBackground,
              }}
            >
              Will you be in Los Angeles or any other branches any time soon?
              Stop by the office! We'd love to meet.
            </p>
            {/* Address */}
            <Row
              className="d-flex mb-4 border-bottom pb-4"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <Col
                className="text-capitalize"
                style={{
                  color: colors.primary,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  letterSpacing: "0.05em",
                }}
              >
                ADDRESS
              </Col>
              <Col style={{ color: colors.blackBackground }}>
                Excepteur sint occaecat cupidatat non proident. Excepteur sint
                occaecat.
              </Col>
            </Row>
            {/* Phone Number */}
            <Row
              className="d-flex mb-4 border-bottom pb-4"
              data-aos="fade-up"
              data-aos-delay={300}
            >
              <Col
                className="text-capitalize"
                style={{
                  color: colors.primary,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  letterSpacing: "0.05em",
                }}
              >
                Phone Number
              </Col>
              <Col style={{ color: colors.blackBackground }}>
                <p className="mb-1">(963) 950-0001</p>
                <p>(973) 532-3214</p>
              </Col>
            </Row>
            {/* Email Address */}
            <Row
              className="d-flex mb-4 pb-4"
              data-aos="fade-up"
              data-aos-delay={400}
            >
              <Col
                className="text-capitalize"
                style={{
                  color: colors.primary,
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  letterSpacing: "0.05em",
                }}
              >
                Email address
              </Col>
              <Col style={{ color: colors.blackBackground }}>
                <p className="mb-1">Info@articula.com</p>
                <p>career@articula.com</p>
              </Col>
            </Row>
          </Col>

          {/* Right Column: Contact Form */}
          <Col md={6} className="mb-4">
            <div className="bg-white p-5 fs-3">
              <p
                className="mb-2"
                style={{
                  color: colors.blackBackground,
                }}
              >
                Get In touch
              </p>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: colors.textMuted.navbar,
                }}
              >
                Feel free contact with us, we love to make new partners &
                friends
              </p>
              <MyForm
                fields={fields}
                onSubmit={handleSubmit}
                buttonText={
                  <>
                    Send Message <IoArrowForwardCircleOutline />
                  </>
                }
              />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormSection;
