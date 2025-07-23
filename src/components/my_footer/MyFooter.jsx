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
import colors from "../../theme/colors";
import logo from "../../assets/icons/GraduationCap.svg";
import "./MyFooter.css"

const MyFooter = () => {
  return (
    <footer
      className="text-white pt-5 pb-3"
      style={{ backgroundColor: "#1D2026" }}
    >
      <Container>
        {/* Top stats section */}
        <Row className="text-center text-md-start mb-5">
          <Col xs={12} md={3} className="mb-4 mb-md-0">
            <h4>
              Start writing with <strong>7.2k</strong> users around{" "}
              <span style={{ color: colors.primary }}>the world</span>.
            </h4>
          </Col>
          <Col xs={6} md={3}>
            <h4>6.3k</h4>
            <small style={{ color: colors.textMuted.footer }}>
              Online articles
            </small>
          </Col>
          <Col xs={6} md={3}>
            <h4>26k</h4>
            <small style={{ color: colors.textMuted.footer }}>
              Certified authors
            </small>
          </Col>
          <Col xs={12} md={3}>
            <h4>99.9%</h4>
            <small style={{ color: colors.textMuted.footer }}>
              Success Rate
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
              Articula
            </h5>
            <p style={{ color: colors.textMuted.navbar }}>
              Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec
              mattis odio at.
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
            <h6>TOP 4 CATEGORY</h6>
            <ul
              className="list-unstyled"
              style={{ color: colors.textMuted.navbar }}
            >
              <li>Development</li>
              <li>Finance & Accounting</li>
              <li>Design</li>
              <li>Business</li>
            </ul>
          </Col>

          <Col xs={6} md={2} className="mb-3">
            <h6>QUICK LINKS</h6>
            <ul
              className="list-unstyled"
              style={{ color: colors.textMuted.navbar }}
            >
              <li>About</li>
              <li>Become an author →</li>
              <li>Contact</li>
              <li>Career</li>
            </ul>
          </Col>

          <Col xs={6} md={2} className="mb-3">
            <h6>SUPPORT</h6>
            <ul
              className="list-unstyled"
              style={{ color: colors.textMuted.navbar }}
            >
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Terms & Condition</li>
              <li>Privacy Policy</li>
            </ul>
          </Col>

          {/* App Download */}
          <Col xs={6} md={3}>
            <h6>DOWNLOAD OUR APP</h6>
            <div
              className="mb-2 d-flex align-items-center gap-2 px-3 py-2"
              style={{ backgroundColor: "#363B4766" }}
            >
              <FaApple size={20} />
              <div>
                <small style={{ color: colors.textMuted.navbar }}>
                  Download now
                </small>
                <div>App Store</div>
              </div>
            </div>
            <div
              className="d-flex align-items-center gap-2 px-3 py-2"
              style={{ backgroundColor: "#363B4766" }}
            >
              <FaGooglePlay size={20} />
              <div>
                <small style={{ color: colors.textMuted.navbar }}>
                  Download now
                </small>
                <div>Play Store</div>
              </div>
            </div>
          </Col>
        </Row>

        <hr className="border-secondary" />
        <p
          className="text-center m-0"
          style={{ color: colors.textMuted.navbar }}
        >
          © 2025 – All rights reserved
        </p>
      </Container>
    </footer>
  );
};

export default MyFooter;
