export async function fetchUser({ setUser, setLoading }) {
  try {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const id = localStorage.getItem("user_id");

    if (!username || !password || !id) {
      throw new Error("Missing credentials in localStorage");
    }

    const btoaToken = btoa(`${username}:${password}`);

    const response = await fetch(
      `https://tamkeen-dev.com/api/user/${id}?_format=json`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoaToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setUser(data);
  } catch (error) {
    console.error("Error fetching account:", error);
  } finally {
    setLoading(false);
  }
}

export async function editUser({
  selectedFile,
  user,
  firstName,
  surname,
  email,
  currentPass,
  setMessage,
}) {
  if (!selectedFile) return;

  try {
    // 1. Upload image
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

    // 2. Update user profile
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

    setMessage?.("Profile updated successfully ✅");

    return true;
  } catch (error) {
    console.error("Error during upload or update:", error);
    setMessage?.("Failed to update profile ❌");
    return false;
  }
}
