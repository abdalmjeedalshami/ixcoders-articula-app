import { Row, Col } from "react-bootstrap";

const MyGellery = ({ images }) => {
  return (
    <div>
      <Row>
        <Col className="d-flex justify-content-end align-items-end mb-3">
          <img className="responsive-height " src={images[0]} alt="office" />
        </Col>
        <Col>
          <img className=" mb-3" src={images[1]} alt="coworking" />
        </Col>
        <Col className="d-flex align-items-end mb-3">
          <img
            className="responsive-height "
            src={images[2]}
            alt="man headset"
          />
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <img className="responsive-height" src={images[3]} alt="charts" />
        </Col>
        <Col md={6} className="mb-3">
          <img className="h-100" src={images[4]} alt="team meeting" />
        </Col>
        <Col>
          <div>
            <img className="mb-3" src={images[5]} alt="girl talking" />
            <img
              className="responsive-height responsive-width"
              src={images[6]}
              alt="woman smiling"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MyGellery;
