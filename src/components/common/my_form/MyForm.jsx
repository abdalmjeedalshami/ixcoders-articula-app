import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "./myForm.css";
import MyButton from "../my_button/MyButton";
import colors from "../../../theme/colors";

const MyForm = ({ fields = [], onSubmit, buttonText = "Submit" }) => {
  const flatFields = fields.flatMap((f) => (f.row ? f.fields : [f]));

  const [formData, setFormData] = useState(
    flatFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {fields.map((fieldGroup, idx) =>
        fieldGroup.row ? (
          <Row key={idx}>
            {fieldGroup.fields.map((field, index) => (
              <Col
                md={6}
                key={field.name}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Form.Group controlId={field.name} className="mb-3">
                  {field.label && (
                    <Form.Label
                      className="fs-6 m-0"
                      style={{ color: colors.blackBackground }}
                    >
                      {field.label}
                    </Form.Label>
                  )}
                  <Form.Control
                    as={field.type === "textarea" ? "textarea" : "input"}
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    placeholder={field.placeholder}
                    onChange={handleChange}
                    style={{
                      color: colors.textMuted.navbar,
                      border: `1px solid ${colors.borderAbsolutCard}`,
                    }}
                  />
                </Form.Group>
              </Col>
            ))}
          </Row>
        ) : (
          <Form.Group
            controlId={fieldGroup.name}
            key={fieldGroup.name}
            className="mb-3"
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            {fieldGroup.label ? (
              <Form.Label
                className="fs-6 m-0"
                style={{ color: colors.blackBackground }}
              >
                {fieldGroup.label}
              </Form.Label>
            ) : (
              <div className="mb-3"></div>
            )}
            <Form.Control
              as={fieldGroup.type === "textarea" ? "textarea" : "input"}
              type={fieldGroup.type || "text"}
              name={fieldGroup.name}
              value={formData[fieldGroup.name]}
              placeholder={fieldGroup.placeholder}
              onChange={handleChange}
              style={{
                fontSize: ".85rem",
                color: colors.textMuted.navbar,
                border: `1px solid ${colors.borderAbsolutCard}`,
              }}
            />
          </Form.Group>
        )
      )}
      <div data-aos="fade-up" data-aos-delay={fields.length * 100}>
        <MyButton text={buttonText} type="submit" classes="mt-4" />
      </div>
    </Form>
  );
};

export default MyForm;
