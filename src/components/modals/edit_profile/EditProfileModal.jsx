import { useState } from "react";
import { Modal } from "react-bootstrap";
import EditProfile from "./EditProfile";
import MyToast from "../../common/my_toast/MyToast";

const EditProfileModal = ({ show, onClose, user, setRefreshFlag }) => {
  const [toast, setToast] = useState({
    show: false,
    message: "",
    success: false,
  });

  // Called from EditProfile after successful submission
  const handleSuccess = () => {
    setToast({
      show: true,
      message: "Profile updated successfully!",
      success: true,
    });
    setRefreshFlag((prev) => !prev);
    onClose(); // close modal automatically
  };

  // Called from EditProfile if submission fails
  const handleFailure = (message) => {
    setToast({
      show: true,
      message: message || "Failed to update profile.",
      success: false,
    });
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setToast({
            show: true,
            message: "Modal closed without saving.",
            success: false,
          });
          onClose();
        }}
        backdrop="static" // click outside triggers onHide
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile
            user={user}
            setRefreshFlag={setRefreshFlag}
            onSuccess={handleSuccess}
            onFailure={handleFailure}
          />
        </Modal.Body>
      </Modal>

      {/* Toast notification */}
      <MyToast
        show={toast.show}
        message={toast.message}
        success={toast.success}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </>
  );
};

export default EditProfileModal;
