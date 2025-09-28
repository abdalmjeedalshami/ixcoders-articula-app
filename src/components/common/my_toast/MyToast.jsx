import { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

function BlogToast({
  show,
  setShow,
  message = "Blog added successfully! 🎉",
  type = "success",
  duration = 3000,
}) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, setShow, duration]);

  const bgClass =
    {
      success: "bg-success",
      error: "bg-danger",
      warning: "bg-warning text-dark",
      info: "bg-info text-dark",
    }[type] || "bg-success";

  return (
    <ToastContainer
      position="top-center"
      className="p-3"
      style={{ zIndex: 9999 }}
    >
      <Toast
        show={show}
        onClose={() => setShow(false)}
        className={bgClass + " text-white"}
        delay={duration}
        autohide
        animation // enables fade animation
      >
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default BlogToast;
