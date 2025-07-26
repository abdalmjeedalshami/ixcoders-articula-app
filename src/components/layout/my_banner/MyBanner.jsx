import { Container } from "react-bootstrap";

const MyBanner = () => {
  return (
    <Container className="my-banner d-flex justify-content-between align-items-center">
      <div>
        <img src="https://placehold.co/600x1200/orange/white" alt="" />
        <strong>Articula</strong>
      </div>

      <div>
        <button>Create Account</button>
        <button>Sign In</button>
      </div>
    </Container>
  );
};

export default MyBanner;
