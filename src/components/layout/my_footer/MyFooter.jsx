import { Container, Row, Col } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import colors from "../../../theme/colors";
import logo from "../../../assets/icons/GraduationCap.svg";
import "./MyFooter.css";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";

const MyFooter = () => {
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <footer
      className="text-white pt-5 pb-3"
      style={{ backgroundColor: "#1D2026" }}
    >
      <Container>
        {/* Top stats section */}
        <Row className="mb-5">
          <Col xs={12} md={3} className="mb-4 mb-md-0">
            <h4>
              {isArabic ? (
                <>
                  ابدأ الكتابة مع <strong>7.2k</strong> مستخدم حول{" "}
                  <span style={{ color: colors.primary }}>العالم</span>.
                </>
              ) : (
                <>
                  Start writing with <strong>7.2k</strong> users around{" "}
                  <span style={{ color: colors.primary }}>the world</span>.
                </>
              )}
            </h4>
          </Col>
          <Col xs={6} md={3}>
            <h4>6.3k</h4>
            <small style={{ color: colors.textMuted.footer }}>
              {isArabic ? "مقالات منشورة" : "Online articles"}
            </small>
          </Col>
          <Col xs={6} md={3}>
            <h4>26k</h4>
            <small style={{ color: colors.textMuted.footer }}>
              {isArabic ? "مؤلفون معتمدون" : "Certified authors"}
            </small>
          </Col>
          <Col xs={12} md={3}>
            <h4>99.9%</h4>
            <small style={{ color: colors.textMuted.footer }}>
              {isArabic ? "نسبة النجاح" : "Success Rate"}
            </small>
          </Col>
        </Row>

        <hr className="border-secondary" />

        {/* Bottom section */}
        <Row className="py-4">
          {/* Brand and social */}
          <Col xs={12} md={3} className="mb-4 mb-md-0">
            <h5 className="d-flex align-items-center gap-2">
              <img src={logo} alt="Logo" style={{ width: 24 }} />
              {isArabic ? "أرتيكيولا" : "Articula"}
            </h5>
            <p style={{ color: colors.textMuted.navbar }}>
              {isArabic
                ? "الحواف المستديرة بارزة، وليست التلال متصلة بالكامل. انتهى البنية الكريهة."
                : "Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec mattis odio at."}
            </p>
            <div className="d-flex flex-wrap gap-2">
              {[
                { Icon: FaFacebookF, url: "https://www.facebook.com" },
                { Icon: FaInstagram, url: "https://www.instagram.com" },
                { Icon: FaLinkedinIn, url: "https://www.linkedin.com" },
                { Icon: FaTwitter, url: "https://www.twitter.com" },
                { Icon: FaYoutube, url: "https://www.youtube.com" },
              ].map(({ Icon, url }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon d-flex align-items-center justify-content-center"
                >
                  <Icon color="white" size={18} />
                </a>
              ))}
            </div>
          </Col>

          {/* Links */}
          <Col xs={6} md={2} className="mb-3">
            <h6>{isArabic ? "أفضل ٤ تصنيفات" : "TOP 4 CATEGORY"}</h6>
            <ul
              className="list-unstyled"
              style={{ color: colors.textMuted.navbar }}
            >
              <li>
                <NavLink to="/faqs">
                  {isArabic ? "البرمجة" : "Development"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs">
                  {isArabic ? "المالية والمحاسبة" : "Finance & Accounting"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs">{isArabic ? "التصميم" : "Design"}</NavLink>
              </li>
              <li>
                <NavLink to="/faqs">
                  {isArabic ? "الأعمال" : "Business"}
                </NavLink>
              </li>
            </ul>
          </Col>

          <Col xs={6} md={2} className="mb-3">
            <h6>{isArabic ? "روابط سريعة" : "QUICK LINKS"}</h6>
            <ul
              className="list-unstyled"
              style={{ color: colors.textMuted.navbar }}
            >
              <li>
                <NavLink to="/faqs">{isArabic ? "من نحن" : "About"}</NavLink>
              </li>
              <li>
                <NavLink to="/faqs">
                  {isArabic ? "كن مؤلفاً" : "Become an author"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs">
                  {isArabic ? "اتصل بنا" : "Contact"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs">{isArabic ? "الوظائف" : "Career"}</NavLink>
              </li>
            </ul>
          </Col>

          <Col xs={6} md={2} className="mb-3">
            <h6>{isArabic ? "الدعم" : "SUPPORT"}</h6>
            <ul
              className="list-unstyled"
              style={{ color: colors.textMuted.navbar }}
            >
              <li>
                <NavLink to="/faqs">
                  {isArabic ? "مركز المساعدة" : "Help Center"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs">
                  {isArabic ? "الأسئلة الشائعة" : "FAQs"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs">
                  {isArabic ? "الشروط والأحكام" : "Terms & Condition"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/faqs">
                  {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
                </NavLink>
              </li>
            </ul>
          </Col>

          {/* App Download */}
          <Col xs={6} md={3}>
            <h6>{isArabic ? "حمّل تطبيقنا" : "DOWNLOAD OUR APP"}</h6>
            <div className="mb-2 d-flex align-items-center gap-2 px-3 py-2 app-button">
              <FaApple size={20} />
              <div>
                <small style={{ color: colors.textMuted.navbar }}>
                  {isArabic ? "حمّل الآن" : "Download now"}
                </small>
                <div>{isArabic ? "متجر آبل" : "App Store"}</div>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 px-3 py-2 app-button">
              <FaGooglePlay size={20} />
              <div>
                <small style={{ color: colors.textMuted.navbar }}>
                  {isArabic ? "حمّل الآن" : "Download now"}
                </small>
                <div>{isArabic ? "متجر جوجل" : "Play Store"}</div>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary" />
        <p
          className="text-center m-0"
          style={{ color: colors.textMuted.navbar }}
        >
          {isArabic
            ? "© 2025 – جميع الحقوق محفوظة"
            : "© 2025 – All rights reserved"}
        </p>
      </Container>
    </footer>
  );
};

export default MyFooter;
