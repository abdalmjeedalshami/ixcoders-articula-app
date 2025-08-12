import { useState } from "react";
import colors from "../../../theme/colors";

const EditProfile = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    try {
      // Upload image
      const uploadResponse = await fetch(
        "https://tamkeen-dev.com/api/file/upload/user/user/user_picture?_format=json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            "X-CSRF-Token": localStorage.getItem("apiToken"),
            "Content-Disposition": `file; filename="${selectedFile.name}"`,
            Authorization:
              "Basic " +
              btoa(
                `${user.name?.[0]?.value}:${localStorage.getItem("password")}`
              ),
          },
          body: selectedFile,
        }
      );

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status ${uploadResponse.status}`);
      }

      const uploadResult = await uploadResponse.json();
      const uploadedPictureId = uploadResult.fid?.[0]?.value;

      if (!uploadedPictureId) {
        throw new Error("No picture ID returned from upload");
      }

      // Update user profile
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      const btoaToken = btoa(`${username}:${password}`);

      const updateBody = {
        field_name: [{ value: firstName }],
        field_surname: [{ value: surname }],
        user_picture: [{ target_id: Number(uploadedPictureId) }],
      };

      if (email) {
        updateBody.mail = [{ value: email }];
        updateBody.current_pass = [{ value: currentPass }];
      }

      const updateResponse = await fetch(
        `https://tamkeen-dev.com/api/user/${user.uid?.[0]?.value}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoaToken}`,
          },
          body: JSON.stringify(updateBody),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(
          `Profile update failed with status ${updateResponse.status}`
        );
      }

      setMessage("Profile updated successfully ✅");
    } catch (error) {
      console.error("Error during upload or update:", error);
      setMessage("Failed to update profile ❌");
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleUpload}>
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            placeholder={user.field_name?.[0]?.value}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Surname</label>
          <input
            type="text"
            className="form-control"
            value={surname}
            placeholder={user.field_surname?.[0]?.value}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Picture</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onInput={handleFileChange}
          />
          
          {/* <button
            className="btn btn-primary mt-2"
            onClick={handleUpload}
            disabled={!selectedFile}
            type="button"
          >
            Upload
          </button> */}
        </div>

        {/* Optional email update */}
        <div className="mb-3">
          <label className="form-label">New Email (optional)</label>
          <input
            type="email"
            className="form-control"
            value={email}
            placeholder={user.mail?.[0]?.value}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {email && (
          <div className="mb-3">
            <label className="form-label">Current Password</label>
            <input
              type="password"
              className="form-control"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
            />
          </div>
        )}

        <button
          type="submit"
          className="btn"
          style={{ backgroundColor: colors.primary, color: "white" }}
        >
          Update Profile
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default EditProfile;
