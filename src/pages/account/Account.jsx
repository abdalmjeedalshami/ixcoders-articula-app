import { useEffect, useState } from "react";
import MyButton from "../../components/common/my_button/MyButton";
import EditProfile from "../../components/cards/edit_profile/EditProfile";
import colors from "../../theme/colors";
import { useNavigate } from "react-router";
import profileImage from "../../../public/images/profile.webp";
import { deleteUserById } from "../../utils/auth";
import { fetchUser } from "../../utils/user";

const Account = () => {
  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser({ setUser, setLoading });
  }, []);

  const deleteAccount = async () => {
    try {
      const tokenResponse = await fetch(
        "https://tamkeen-dev.com/api/session/token"
      );
      if (!tokenResponse.ok) throw new Error("Failed to fetch CSRF token");

      const csrfToken = await tokenResponse.text();
      localStorage.setItem("apiToken", csrfToken);
      const token = localStorage.getItem("apiToken");
      const id = localStorage.getItem("id");

      const deleteResponse = await fetch(
        `https://tamkeen-dev.com/api/user/${id}?_format=json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": token,
          },
        }
      );

      if (deleteResponse.status === 204) {
        console.log("Account deleted successfully");
        localStorage.clear();
        navigate("/");
      } else {
        const errorText = await deleteResponse.text();
        throw new Error(`Failed to delete account: ${errorText}`);
      }
    } catch (error) {
      console.error("Error deleting account: ", error);
    } finally {
      console.log("Delete account process finished");
    }
  };

  const deleteMyAccount2 = async () => {
    try {
      const response = await fetch(
        `https://tamkeen-dev.com/api/user/421?_format=json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": `h-B5ODauYZCvHn3hfiHm4rTv518Zf1krLW_cU-gqxBw`,
          },
        }
      );

      if (response.status !== 204)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      localStorage.clear();
    } catch (error) {
      console.error("Error delete account:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMyAccount3 = async (e) => {
    e.preventDefault();
    fetch(
      `https://tamkeen-dev.com/api/user/${localStorage.getItem(
        "id"
      )}?_format=json`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": `${localStorage.getItem("apiToken")}`,
        },
      }
    )
      .then((response) => {
        console.log("This is the status code: " + response.status);
        if (response.status !== 204)
          throw new Error(`HTTP error! Status: ${response.status}`);
        console.log("deleted");
        return response;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        console.log("fetch done..");
      });
  };

  const deleteMyAccount = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("user_id");
    const csrfToken = localStorage.getItem("apiToken");

    const success = await deleteUserById(userId, csrfToken);

    if (success) {
      // Optionally redirect, show toast, or clear localStorage
      console.log("Account deletion confirmed");
    } else {
      console.log("Account deletion failed");
    }
  };

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading Your Profile...</span>
        </div>
        <p className="mt-3 fs-6 text-muted">Loading Your Profile…</p>
      </div>
    );
  if (!user)
    return <p className="text-center mt-5">Unable to load profile data.</p>;

  return (
    <div className="container mx-auto p-5">
      {/* Profile Header */}
      <div className="row align-items-center g-4 pb-2">
        <div className="col-12 col-md-auto text-center text-md-start">
          <img
            src={user.user_picture?.[0]?.url || "/images/default-profile.jpg"}
            alt="Profile"
            className="img-fluid border"
            style={{ maxWidth: "150px", height: "auto", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null; // Prevent infinite loop
              e.target.src = profileImage; // Fallback image
            }}
          />
        </div>

        <div className="col">
          <div className="d-flex justify-content-between">
            <h1 className="fw-bold mb-1">
              {user.field_name?.[0]?.value} {user.field_surname?.[0]?.value}
            </h1>
            <button
              className="btn"
              style={{ backgroundColor: colors.primary, color: "white" }}
              onClick={() => setShowEdit(true)}
            >
              Edit
            </button>
          </div>
          <p className="fs-5 text-muted mb-1">@{user.name?.[0]?.value}</p>
          <p className="fs-6 text-muted">{user.mail?.[0]?.value}</p>
        </div>
      </div>
      {/* Account Info */}
      <div className="mt-4">
        {[
          ["User ID", user.uid?.[0]?.value],
          ["UUID", user.uuid?.[0]?.value],
          ["Language", user.langcode?.[0]?.value],
          ["Timezone", user.timezone?.[0]?.value],
          [
            "Status",
            <span
              className={
                user.status?.[0]?.value ? "text-success" : "text-danger"
              }
            >
              {user.status?.[0]?.value ? "Active" : "Inactive"}
            </span>,
          ],
          ["Mobile", user.field_mobile?.[0]?.value],
          ["Created", new Date(user.created?.[0]?.value).toLocaleDateString()],
          [
            "Last Access",
            new Date(user.access?.[0]?.value).toLocaleDateString(),
          ],
        ].map(([label, value], index) => (
          <div
            key={index}
            className="row py-2 border-bottom align-items-center text-break"
          >
            <div className="col-6 fw-medium">{label}</div>
            <div className="col-6 text-end">{value}</div>
          </div>
        ))}
      </div>

      {/* Delete Button */}
      <div className="text-end mt-4">
        <button
          className="btn btn-danger"
          style={{ color: "white" }}
          onClick={deleteMyAccount}
        >
          Delete My Account
        </button>
      </div>

      {/* Modal */}
      {showEdit && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowEdit(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowEdit(false)}
                  aria-label="Close"
                  style={{ backgroundColor: colors.primary }}
                />
              </div>
              <div className="modal-body">
                <EditProfile user={user} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
