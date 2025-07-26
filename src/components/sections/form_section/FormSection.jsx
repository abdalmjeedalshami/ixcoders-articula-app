import { Container, Row, Col, Form, Button } from "react-bootstrap";
import colors from "../../../theme/colors";
import MyButton from "../../common/my_button/MyButton";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const FormSection = () => {
  return (
    <div className="py-5" style={{ backgroundColor: colors.sectionBackground }}>
      {" "}
      {/* Light grey background */}
      <Container>
        {/* Main Title */}
        <Row className="mb-1 text-center">
          <Col>
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
          <Col md={6} className="pe-md-5">
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
            <Row className="d-flex mb-4 border-bottom pb-4">
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
            <Row className="d-flex mb-4 border-bottom pb-4">
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
            <Row className="d-flex mb-4 pb-4">
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
              <Form>
                <Row className="">
                  <Col>
                    <Form.Group controlId="formFirstName">
                      {" "}
                      <Form.Label
                        className="fs-6"
                        style={{ color: colors.blackBackground }}
                      >
                        First Name
                      </Form.Label>{" "}
                      <Form.Control
                        type="text"
                        placeholder="First Name..."
                        style={{
                          height: "50px",
                          borderRadius: "0",
                          color: colors.textMuted.navbar,
                          border: `1px solid ${colors.borderAbsolutCard}`,
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="formLastName">
                      {" "}
                      <Form.Label
                        className="fs-6"
                        style={{ color: colors.blackBackground }}
                      >
                        Last Name
                      </Form.Label>{" "}
                      <Form.Control
                        type="text"
                        placeholder="Last Name..."
                        style={{
                          height: "50px",
                          borderRadius: "0",
                          color: colors.textMuted.navbar,
                          border: `1px solid ${colors.borderAbsolutCard}`,
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="" controlId="formBasicEmail">
                  {" "}
                  <Form.Label
                    className="fs-6"
                    style={{ color: colors.blackBackground }}
                  >
                    Email Address
                  </Form.Label>{" "}
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    style={{
                      height: "50px",
                      borderRadius: "0",
                      color: colors.textMuted.navbar,
                      border: `1px solid ${colors.borderAbsolutCard}`,
                      fontSize: "0.9rem",
                    }}
                  />
                </Form.Group>
                <Form.Group className="" controlId="formBasicSubject">
                  {" "}
                  <Form.Label
                    className="fs-6"
                    style={{ color: colors.blackBackground }}
                  >
                    Message Subject
                  </Form.Label>{" "}
                  <Form.Control
                    type="text"
                    placeholder="Message Subject"
                    style={{
                      height: "50px",
                      borderRadius: "0",
                      color: colors.textMuted.navbar,
                      border: `1px solid ${colors.borderAbsolutCard}`,
                      fontSize: "0.9rem",
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-4" controlId="formBasicMessage">
                  {" "}
                  <Form.Label
                    className="fs-6"
                    style={{ color: colors.blackBackground }}
                  >
                    Message Subject
                  </Form.Label>{" "}
                  <Form.Control
                    as="textarea"
                    rows={6} // Adjust rows as needed
                    placeholder="Message Subject" // Text area placeholder is "Message Subject" in image, but usually "Message"
                    style={{
                      borderRadius: "0",
                      color: colors.textMuted.navbar,
                      border: `1px solid ${colors.borderAbsolutCard}`,
                      fontSize: "0.9rem",
                      resize: "none", // Prevent user from resizing
                    }}
                  />
                </Form.Group>
                <MyButton
                  type={"submit"}
                  text={
                    <>
                      Send Message <IoArrowForwardCircleOutline />
                    </>
                  }
                />
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FormSection;
