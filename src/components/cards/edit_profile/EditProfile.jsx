import { useState } from "react";
import colors from "../../../theme/colors";
import { editUser } from "../../../utils/user";
import MyButton from "../../common/my_button/MyButton";

const EditProfile = ({ user, setRefreshFlag }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ start loading

    const success = await editUser({
      selectedFile,
      user,
      firstName,
      surname,
      email,
      currentPass,
      setMessage,
    });

    if (success) {
      setRefreshFlag((prev) => !prev);
    }

    setLoading(false); // ✅ stop loading
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

        <MyButton
          text={loading ? "Updating..." : "Update Profile"} // ✅ change text
          type="submit"
          classes="rounded-2"
          disabled={loading} // ✅ disable button
        />
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default EditProfile;
