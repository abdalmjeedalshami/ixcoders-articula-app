import { useEffect, useState } from "react";
import GalleryDropzone from "../../components/common/GalleryDropzone/GalleryDropzone";
import { createBlog, uploadSingleImage } from "../../utils/blog";
import { uploadMultipleImages } from "../../utils/blog";

const usingMediaReferences = false; // set true if field_image/field_gallery reference Media instead of File
const BUNDLE = "blog";

const BlogCreatePage = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  const [title, setTitle] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchTaxonomyData() {
      try {
        const headers = { "Content-Type": "application/json" };

        const [tagsRes, categoryRes] = await Promise.all([
          fetch("https://tamkeen-dev.com/api/terms/tags", { headers }),
          fetch("https://tamkeen-dev.com/api/terms/category", { headers }),
        ]);

        if (!tagsRes.ok || !categoryRes.ok) {
          throw new Error("Failed to fetch one or more taxonomy endpoints");
        }

        const [tagsData, categoryData] = await Promise.all([
          tagsRes.json(),
          categoryRes.json(),
        ]);

        setTags(tagsData);
        setCategories(categoryData);

        console.info("Taxonomy terms loaded successfully");
      } catch (error) {
        console.error("Error fetching taxonomy terms:", error);
        setError(error.message);
      }
    }

    fetchTaxonomyData();
  }, []);

  useEffect(() => {
    const albumField = galleryFiles.map((file) => ({
      target_id: file,
    }));

    setInputData((prev) => ({
      ...prev,
      field_gallery: albumField,
    }));
  }, [galleryFiles]);

  const handleUploadSingleImage = async (event) => {
    event.preventDefault();

    if (!selectedFile) {
      console.log("no file");
      return;
    }

    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
      throw new Error("Missing credentials in localStorage");
    }

    const btoaToken = btoa(`${username}:${password}`);

    try {
      setStatus("Uploading...");
      const result = await uploadSingleImage({
        file: selectedFile,
        endpoint:
          "https://tamkeen-dev.com/api/file/upload/node/blog/field_image?_format=json",
        filename: selectedFile.name,
        token: btoaToken,
      });

      setStatus("Upload successful!");
      console.log("Server response:", result);
      setMessage("Blog created");
      setSuccess("Blog created");
    } catch (err) {
      setError("Blog did not created");
      setMessage("Blog did not created");
      setStatus(`Error: ${err.message}`);
    }
  };

  const handleUploadMultipleImages = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    if (!file) return;

    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const token = btoa(`${username}:${password}`);

    setUploading(true);
    setError(null);

    try {
      const uploaded = await uploadMultipleImages({ file: file, token: token });
      setGalleryFiles((prev) => [...prev, ...uploaded]); // adjust if response is nested
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const [inputData, setInputData] = useState({
    type: [
      {
        target_id: "blog",
      },
    ],
    title: [
      {
        value: title,
      },
    ],
    body: [
      {
        value: null,
        format: "basic_html",
      },
    ],
    field_image: [
      {
        target_id: null,
      },
    ],
    field_gallery: galleryFiles,

    field_tags: [],

    field_category: [
      {
        target_id: null,
      },
    ],
  });

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    if (!username || !password) {
      throw new Error("Missing credentials in localStorage");
    }

    const btoaToken = btoa(`${username}:${password}`);

    try {
      const result = await createBlog({ data: inputData, token: btoaToken });
      console.log(result);
      return result;
    } catch (err) {
      console.error("Blog creation error:", err);
      setError(err);
      return null; // Optional: make return type predictable
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h2>Create Blog</h2>

      {error && (
        <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>
      )}
      {success && (
        <div style={{ color: "seagreen", marginBottom: 12 }}>{success}</div>
      )}

      <form onSubmit={handleCreateBlog}>
        {/* Title */}
        <div style={{ marginBottom: 12 }}>
          <label>
            Title
            <input
              type="text"
              value={inputData.title || ""}
              onChange={(e) =>
                setInputData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>

        {/* Body */}
        <div style={{ marginBottom: 12 }}>
          <label>
            Body (HTML allowed)
            <textarea
              value={inputData.body || ""}
              onChange={(e) =>
                setInputData((prev) => ({
                  ...prev,
                  body: e.target.value,
                }))
              }
              rows={10}
              placeholder="e.g. The standard Lorem Ipsum passage, <b>used since the 1500s</b>..."
              style={{
                width: "100%",
                padding: 8,
                marginTop: 4,
                fontFamily: "monospace",
              }}
            />
          </label>
        </div>

        {/* image */}
        <div className="mb-3">
          <label className="form-label">Upload Picture</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) =>
              setInputData({
                ...inputData,
                field_image: e.target.files[0],
              })
            }
          />
        </div>

        {/* Album */}
        <GalleryDropzone files={galleryFiles} setFiles={setGalleryFiles} />

        {/* Tags */}
        <div style={{ marginBottom: 12 }}>
          <label>
            Tags
            <select
              multiple
              value={selectedTagIds}
              onChange={(e) => {
                const selectedIds = Array.from(e.target.selectedOptions).map(
                  (o) => parseInt(o.value, 10)
                );

                setSelectedTagIds(selectedIds); // UI state
                setInputData((prev) => ({
                  ...prev,
                  field_tags: selectedIds.map((id) => ({ target_id: id })),
                }));
              }}
              style={{ width: "100%", height: 120, marginTop: 4 }}
            >
              {tags.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Category */}
        <div style={{ marginBottom: 12 }}>
          <label>
            Category
            <select
              value={selectedCategoryId}
              onChange={(e) => {
                const selectedId = e.target.value;
                setSelectedCategoryId(selectedId); // keep this if you're tracking separately
                setInputData((prev) => ({
                  ...prev,
                  field_category: [{ target_id: selectedId }],
                }));
              }}
              style={{ width: "100%", marginTop: 4 }}
            >
              <option value="">-- Select --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Create Button */}
        <button
          disabled={submitting}
          // onClick={(e) => {
          //   e.preventDefault();
          //   console.log(inputData);
          // }}
        >
          {submitting ? "Creating..." : "Create"}
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default BlogCreatePage;
