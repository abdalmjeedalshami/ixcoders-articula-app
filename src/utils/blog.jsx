export async function fetchArticles({
  setArticles,
  setTotalPages,
  setLoading,
  search = "",
  category = "",
  tag,
  sortBy = "created_date",
  sortOrder = "DESC",
  page = 0,
  itemsPerPage = 5,
}) {
  try {
    setLoading(true);

    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
      throw new Error("Missing credentials in localStorage");
    }

    const btoaToken = btoa(`${username}:${password}`);

    const params = new URLSearchParams();
    params.append("items_per_page", itemsPerPage);
    params.append("page", page);
    if (search) params.append("search", search);
    if (category) params.append("category", category);
    if (tag) params.append("tag", tag);
    if (sortBy) params.append("sort_by", sortBy);
    if (sortOrder) params.append("sort_order", sortOrder);

    const url = `https://tamkeen-dev.com/api/blogs-api?${params.toString()}`;

    console.log(url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoaToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    setArticles(data.rows || []);
    setTotalPages ? setTotalPages(data.pager?.total_pages || 1) : "";
  } catch (error) {
    console.error("Error fetching articles:", error);
    setArticles([]);
    setTotalPages ? setTotalPages(1) : "";
  } finally {
    setLoading(false);
  }
}

export async function fetchUserArticles({ setArticles, setLoading }) {
  try {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
      throw new Error("Missing credentials in localStorage");
    }

    const btoaToken = btoa(`${username}:${password}`);

    const response = await fetch(
      "https://tamkeen-dev.com/api/blogs-api-current-user",
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
    setArticles(data.rows);
  } catch (error) {
    console.error("Error fetching articles:", error);
  } finally {
    setLoading(false);
  }
}

export async function uploadSingleImage({
  file,
  filename = "image.jpg",
  token,
}) {
  if (!file) throw new Error("Missing file");

  const response = await fetch(
    "https://tamkeen-dev.com/api/file/upload/node/blog/field_image?_format=json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "X-CSRF-Token": localStorage.getItem("apiToken"),
        "Content-Disposition": `file; filename="${filename}"`,
        Authorization: `Basic ${token}`,
      },
      body: file,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }
  // console.log(response.json())

  return await response.json(); // or response.text() if backend returns plain text
}

export async function uploadMultipleImages({
  file,
  token,
  filename = "image.jpg",
}) {
  if (!file) throw new Error("Missing file");

  const response = await fetch(
    "https://tamkeen-dev.com/api/file/upload/node/blog/field_gallery?_format=json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/octet-stream",
        "X-CSRF-Token": localStorage.getItem("apiToken"),
        "Content-Disposition": `file; filename="${filename}"`,
        Authorization: `Basic ${token}`,
      },
      body: file,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  return await response.json(); // assuming it returns uploaded file info
}

export async function createBlog({ data, token }) {
  try {
    // Upload Image
    const uploadSingleImageResponse = await uploadSingleImage({
      file: data.field_image,
      token: token,
    });
    const singleImageId = uploadSingleImageResponse.fid[0].value;

    // Upload Gallery
    const uploadResponses = await Promise.all(
      data.field_gallery.map((file) =>
        uploadMultipleImages({
          file: file.target_id,
          token: token,
        })
      )
    );

    // Extract all file IDs (assuming each response has fid[0].value)
    const target_id_album = uploadResponses.map((res) => ({
      target_id: res.fid[0].value,
    }));

    const payload = {
      type: [{ target_id: "blog" }],
      title: [{ value: data.title }],
      body: [
        {
          value: data.body,
          format: "basic_html",
        },
      ],
      field_image: [{ target_id: singleImageId }],
      field_gallery: target_id_album,
      field_tags: data.field_tags,
      field_category: data.field_category,
    };

    console.log(payload);

    const response = await fetch(
      "https://tamkeen-dev.com/api/node?_format=json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": localStorage.getItem("apiToken"),
          Authorization: `Basic ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.status !== 201) {
      throw new Error(`Blog creation failed: `);
    }

    return await response.json();
  } catch (err) {
    console.error("Error creating blog:", err);
    throw err;
  }
}

export async function editBlog({ id, data, token }) {
  try {
    console.log(data);
    
    // Upload Gallery
    const uploadResponses = await Promise.all(
      data.field_gallery.map((file) =>
        uploadMultipleImages({
          file: file.target_id,
          token: token,
        })
      )
    );

    // Extract all file IDs (assuming each response has fid[0].value)
    const target_id_album = uploadResponses.map((res) => ({
      target_id: res.fid[0].value,
    }));

    const payload = {
      type: [{ target_id: "blog" }],
      title: data.title,
      body: data.body,
      field_gallery: target_id_album,
      field_tags: data.field_tags,
    };

    console.log("this is payload: ");
    console.log(payload);

    const response = await fetch(
      `https://tamkeen-dev.com/api/node/${id}?_format=json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": localStorage.getItem("apiToken"),
          Authorization: `Basic ` + token,
        },
        body: JSON.stringify(payload),
      }
    );

    if (!response.ok) {
      throw new Error(`Blog creation failed: `);
    }

    return await response.json();
  } catch (err) {
    console.error("Error creating blog:", err);
    throw err;
  }
}
