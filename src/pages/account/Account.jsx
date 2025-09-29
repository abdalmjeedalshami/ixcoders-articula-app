import { useEffect, useState } from "react";
import MyButton from "../../components/common/my_button/MyButton";
import EditProfile from "../../components/cards/edit_profile/EditProfile";
import { useNavigate } from "react-router";
import profileImage from "../../../public/images/profile.webp";
import { deleteUserById } from "../../utils/auth";
import { fetchUser } from "../../utils/user";
import { AiOutlineClose } from "react-icons/ai";
import MySpinner from "../../components/common/mySpinner/MySpinner";
import { useUser } from "../../utils/UserContext";
import { useTranslation } from "react-i18next";

const Account = () => {
  const { user, setUser } = useUser();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  const navigate = useNavigate();
  const [showEdit, setShowEdit] = useState(false);
  // const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    fetchUser({ setUser, setLoading });
  }, [refreshFlag]);

  /// ToDo: Fix delete account function.

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
      console.log("Account deletion confirmed");
    } else {
      console.log("Account deletion failed");
    }
  };

  if (loading) return <MySpinner />;
  if (!user)
    return <p className="text-center mt-5">Unable to load profile data.</p>;

  return (
    <div className="container mx-auto p-5">
      {/* Profile Header */}
      <div className="row align-items-center g-4 pb-2" data-aos="fade-up">
        <div
          className="col-12 col-md-auto text-center text-md-start"
          data-aos="zoom-in"
        >
          <img
            src={user.user_picture?.[0]?.url || "/images/default-profile.jpg"}
            alt="Profile"
            className="img-fluid border"
            style={{ maxWidth: "150px", height: "auto", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = profileImage;
            }}
          />
        </div>

        <div className="col" data-aos="fade-left">
          <div className="d-flex justify-content-between align-items-start">
            <h1 className="fw-bold mb-1">
              {user.field_name?.[0]?.value} {user.field_surname?.[0]?.value}
            </h1>
            <MyButton
              text="Edit"
              onClick={() => {
                setShowEdit(true);
              }}
            />
          </div>
          <p className="fs-5 text-muted mb-1">@{user.name?.[0]?.value}</p>
          <p className="fs-6 text-muted">{user.mail?.[0]?.value}</p>
        </div>
      </div>

      {/* Account Info */}
      <div className="mt-4">
        {[
          [isArabic ? "رقم المستخدم" : "User ID", user.uid?.[0]?.value],
          [isArabic ? "UUID" : "UUID", user.uuid?.[0]?.value],
          [isArabic ? "اللغة" : "Language", user.langcode?.[0]?.value],
          [
            isArabic ? "المنطقة الزمنية" : "Timezone",
            user.timezone?.[0]?.value,
          ],
          [
            isArabic ? "الحالة" : "Status",
            <span
              className={
                user.status?.[0]?.value ? "text-success" : "text-danger"
              }
            >
              {user.status?.[0]?.value
                ? isArabic
                  ? "نشط"
                  : "Active"
                : isArabic
                ? "غير نشط"
                : "Inactive"}
            </span>,
          ],
          [
            isArabic ? "الهاتف المحمول" : "Mobile",
            user.field_mobile?.[0]?.value,
          ],
          [
            isArabic ? "تاريخ الإنشاء" : "Created",
            user.created?.[0]?.value
              ? new Date(user.created[0].value).toLocaleDateString(
                  isArabic ? "ar-EG" : "en-US"
                )
              : "-",
          ],
          [
            isArabic ? "آخر وصول" : "Last Access",
            user.access?.[0]?.value
              ? new Date(user.access[0].value).toLocaleDateString(
                  isArabic ? "ar-EG" : "en-US"
                )
              : "-",
          ],
        ].map(([label, value], index) => (
          <div
            key={index}
            className="row py-2 border-bottom align-items-center text-break"
            data-aos="fade-up"
            data-aos-delay={100 + index * 50}
            data-aos-offset="0"
          >
            <div className="col-6 fw-medium">{label}</div>
            <div className="col-6 d-flex justify-content-end">
              {value || "-"}
            </div>
          </div>
        ))}
      </div>

      {/* Delete Button */}
      <div
        className="text-end mt-4"
        data-aos="fade-up"
        data-aos-easing="ease-in-back"
        // data-aos-delay="0"
        data-aos-offset="0"
      >
        <MyButton
          text="Delete My Account"
          backgroundColor="red"
          onClick={deleteMyAccount}
        />
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
            <div className="modal-content rounded-0">
              <div className="modal-header d-flex justify-content-between">
                <h5 className="modal-title">Edit Profile</h5>
                <MyButton
                  classes="p-0 rounded-0"
                  text={
                    <>
                      <AiOutlineClose />
                    </>
                  }
                  onClick={() => setShowEdit(false)}
                />
              </div>
              <div className="modal-body">
                <EditProfile user={user} setRefreshFlag={setRefreshFlag} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
