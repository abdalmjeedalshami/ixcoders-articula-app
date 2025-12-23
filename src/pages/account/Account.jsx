import { useEffect, useState } from "react";
import MyButton from "../../components/common/my_button/MyButton";
import EditProfile from "../../components/cards/edit_profile/EditProfile";
import { useNavigate } from "react-router";
import profileImage from "../../assets/images/profile.webp";
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
    const username = localStorage.getItem('username')
    if (username === "Abd Al-Mjeed") {
      setUser({
        uid: [{ value: "13" }],
        uuid: [{ value: "5857f9c2-36f0-4308-baa0-2467cd0ac6fe" }],
        langcode: [{ value: "en" }],
        preferred_langcode: [
          {
            value: "en"
          }],
        preferred_admin_langcode: [],
        field_name: [{ value: "Abd Al-Mjeed" }],
        field_surname: [{ value: "Al-Shami" }],
        name: [{ value: "abdalmjeed" }],
        mail: [{ value: "abd.almjeed.alshami.1@gmail.com" }],
        field_mobile: [{ value: "+963 938 957 460" }],
        timezone: [{ value: "Europe/Istanbul" }],
        created: [{
          value: "2025-07-08T20:20:21+00:00",
          format: "Y-m-d\\TH:i:sP"
        }],
        access: [{
          value: "2025-07-08T20:40:53+00:00",
          format: "Y-m-d\\TH:i:sP"
        }],
        default_langcode: [
          {
            value: true
          }
        ],
        path: [
          {
            alias: "",
            pid: null,
            langcode: "en"
          }
        ],
        field_gender: [
          {
            target_id: 9,
            target_type: "taxonomy_term",
            target_uuid: "f85eac56-91a7-4d6b-b9ed-25b33b01e0ad",
            url: "/api/taxonomy/term/9"
          }
        ],
      })

      setTimeout(() => {
        setLoading(false);
      }, 1000); // 1000 ms = 1 second

    } else {
      fetchUser({ setUser, setLoading });

    }
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

  if (loading || !user || !user.uid?.[0]?.value) {
    return (
      <div className="container mt-4">
        <div className="card shadow-sm border-0 p-4">
          {/* Top bar row */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              {/* Avatar */}
              <div
                className="placeholder rounded-circle me-3"
                style={{ width: "80px", height: "80px" }}
              ></div>

              {/* Name, username, email */}
              <div>
                <div className="placeholder-glow mb-2">
                  <span className="placeholder col-6" style={{ width: "10rem" }}></span>
                </div>
                <div className="placeholder-glow mb-2">
                  <span className="placeholder col-4"></span>
                </div>
                <div className="placeholder-glow">
                  <span className="placeholder col-8"></span>
                </div>
              </div>
            </div>

            {/* Edit button */}
            <div
              className="placeholder rounded"
              style={{ width: "100px", height: "38px" }}
            ></div>
          </div>

          {/* User details table */}
          <div className="table-responsive mb-4">
            <table className="table">
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td>
                      <div className="placeholder-glow">
                        <span className="placeholder col-6 rounded-2"></span>
                      </div>
                    </td>
                    <td>
                      <div className="placeholder-glow d-flex justify-content-end">
                        <span className="placeholder col-6 rounded-2"></span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Delete button */}
          <div className="text-end">
            <div
              className="placeholder rounded"
              style={{ width: "180px", height: "45px" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="text-center py-5">
  //       <i className="bi bi-exclamation-circle text-danger fs-1"></i>
  //       <h5 className="mt-3">
  //         {isArabic ? "خطأ في تحميل الحساب" : "Account load failed"}
  //       </h5>
  //       <p className="text-muted">
  //         {isArabic
  //           ? "تعذر تحميل بيانات الحساب. حاول مجددًا لاحقًا."
  //           : "Unable to load your profile data. Please try again later."}
  //       </p>
  //       <button className="btn btn-outline-primary mt-2" onClick={refetch}>
  //         {isArabic ? "إعادة المحاولة" : "Retry"}
  //       </button>
  //     </div>
  //   );
  // }

  // if (!user) {
  //   return (
  //     <div className="text-center py-5 text-muted">
  //       {isArabic ? "لا تتوفر بيانات الحساب." : "No account data available."}
  //     </div>
  //   );
  // }

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
