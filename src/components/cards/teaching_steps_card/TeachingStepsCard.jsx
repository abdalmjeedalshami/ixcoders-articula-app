import { Card, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const TeachingStepsCard = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const steps = [
    {
      number: 1,
      text: isArabic ? "قدّم لتصبح مؤلفاً" : "Apply to become author",
      bg: "#EAE8FF",
      color: "#6C5CE7",
    },
    {
      number: 2,
      text: isArabic ? "أنشئ وعدّل ملفك الشخصي" : "Build & edit your profile",
      bg: "#FFE8E5",
      color: "#FF6B6B",
    },
    {
      number: 3,
      text: isArabic ? "أنشئ مقالتك الجديدة" : "Create your new article",
      bg: "#FFE5E5",
      color: "#FF4D4D",
    },
    {
      number: 4,
      text: isArabic ? "ابدأ التعليم والكسب" : "Start teaching & earning",
      bg: "#E6F9EC",
      color: "#2ECC71",
    },
  ];
  return (
    <Card className="p-4 border-0 bg-white rounded-0 h-100">
      <h4 className="fw-bold mb-4 text-dark" data-aos="fade-down">
        {isArabic ? "خطواتك للتعليم والكسب" : "Your teaching & earning steps"}
      </h4>

      <Row xs={1} sm={2} className="h-100">
        {steps.map((step, idx) => (
          <Col
            key={idx}
            className="d-flex align-items-center mb-3"
            data-aos="fade-up"
            data-aos-delay={idx * 150} // stagger each step
          >
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: step.bg,
                  color: step.color,
                  fontWeight: "bold",
                }}
              >
                {step.number}
              </div>
              <div className="text-dark">{step.text}</div>
            </div>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default TeachingStepsCard;
