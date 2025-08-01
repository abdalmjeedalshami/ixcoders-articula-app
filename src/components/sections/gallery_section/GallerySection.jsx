import { Container, Row, Col, Button } from "react-bootstrap";
import img1 from "../../../../public/images/about_us/img1.jpg";
import img2 from "../../../../public/images/about_us/img2.jpg";
import img3 from "../../../../public/images/about_us/img3.jpg";
import img4 from "../../../../public/images/about_us/img4.jpg";
import img5 from "../../../../public/images/about_us/img5.jpg";
import img6 from "../../../../public/images/about_us/img6.jpg";
import img7 from "../../../../public/images/about_us/img7.jpg";
import colors from "../../../theme/colors";
import MyButton from "./../../common/my_button/MyButton";
import { FaArrowRight } from "react-icons/fa6";
import MyGellery from "../../common/my_gallery/MyGellery";

const images = [img1, img2, img3, img4, img5, img6, img7];

const GallerySection = () => {
  return (
    <Container
      fluid
      className="py-5"
      style={{ backgroundColor: colors.sectionBackground }}
    >
      <Container>
        <Row className="align-items-center">
          {/* LEFT TEXT SIDE */}
          <Col md={5} className="mb-4 mb-md-0">
            <p
              className="m-0 text-uppercase fw-semibold"
              style={{ color: colors.primary }}
            >
              Our Gallery
            </p>
            <h2
              className="fw-bold mb-3"
              style={{ color: colors.blackBackground }}
            >
              We’ve been here
              <br />
              almost 15 years
            </h2>
            <p
              className="mb-4 pe-5"
              style={{ color: colors.textMuted.welcome }}
            >
              Fusce lobortis leo augue, sit amet tristique nisi commodo in.
              Aliquam ac libero quis tellus venenatis imperdiet. Sed sed nunc
              libero. Curabitur in urna ligula, torquent per conubia nostra.
            </p>
            <MyButton
              text={
                <>
                  Join our team <FaArrowRight />
                </>
              }
            />
          </Col>

          {/* RIGHT IMAGES SIDE */}
          <Col md={7}>
            <MyGellery images={images} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default GallerySection;
