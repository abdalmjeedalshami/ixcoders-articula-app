import { useEffect, useState } from "react";
import GalleryDropzone from "../../components/common/GalleryDropzone/GalleryDropzone";

const usingMediaReferences = false; // set true if field_image/field_gallery reference Media instead of File
const BUNDLE = "blog";

const BlogCreatePage = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const [title, setTitle] = useState("");
  const [bodyHtml, setBodyHtml] = useState("");
  //   const [imageFile, setImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [tags, setTags] = useState([]); // available tag options
  const [categories, setCategories] = useState([]); // available category options

  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      console.log("there is not image selected");
      return;
    }
    // if (!galleryFiles) return;

    try {
      // Upload image
      const formData = new FormData();
      formData.append("field_image", selectedFile, selectedFile.name);

      const csrfToken = localStorage.getItem("apiToken");
      const username = localStorage.getItem("username");
      const password = localStorage.getItem("password");
      const authToken = btoa(`${username}:${password}`);

      const uploadResponse = await fetch(
        "https://tamkeen-dev.com/api/file/upload/node/blog/field_image?_format=json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/octet-stream",
            "X-CSRF-Token": csrfToken,
            Authorization: `Basic ${authToken}`,
            "Content-Disposition": `file; filename=${selectedFile.name}`,
          },
          body: selectedFile,
        }
      );

      if (uploadResponse.status !== 201) {
        throw new Error(`Upload failed: ${uploadResponse.statusText}`);
      }

      const uploadResult = await uploadResponse.json();
      const uploadedPictureId = uploadResult?.fid?.[0]?.value;

      if (!uploadedPictureId) {
        throw new Error("No image ID returned from upload");
      }

      //   const updateResponse = await fetch(
      //     `https://tamkeen-dev.com/api/user/${user.uid?.[0]?.value}`,
      //     {
      //       method: "PATCH",
      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Basic ${authToken}`,
      //       },
      //       body: JSON.stringify(updateBody),
      //     }
      //   );

      //   if (!updateResponse.ok) {
      //     throw new Error(`Profile update failed: ${updateResponse.statusText}`);
      //   }

      setMessage("✅ Profile updated successfully");
    } catch (error) {
      console.error("Upload or update error:", error);
      setMessage("❌ Failed to update profile");
    }
  };

  //   async function handleSubmit(e) {
  //     e.preventDefault();
  //     setError("");
  //     setSuccess("");
  //     setSubmitting(true);

  //     try {
  //       // 1) Upload main image (optional)
  //       let imageTargetId = null;
  //       if (imageFile) {
  //         const fid = await uploadFileToField({
  //           file: imageFile,
  //           bundle: BUNDLE,
  //           fieldName: usingMediaReferences ? "field_media_image" : "field_image",
  //         });
  //         imageTargetId = usingMediaReferences
  //           ? await createMediaImageFromFile({
  //               fileId: fid,
  //               name: imageFile.name,
  //             })
  //           : fid;
  //       }

  //       // 2) Upload gallery files (optional)
  //       let galleryTargetIds = [];
  //       if (galleryFiles?.length) {
  //         for (const file of galleryFiles) {
  //           const fid = await uploadFileToField({
  //             file,
  //             bundle: BUNDLE,
  //             fieldName: usingMediaReferences ? "field_gallery" : "field_gallery",
  //           });
  //           const targetId = usingMediaReferences
  //             ? await createMediaImageFromFile({ fileId: fid, name: file.name })
  //             : fid;
  //           galleryTargetIds.push(targetId);
  //         }
  //       }

  //       // 3) Create node
  //       const node = await createBlogNode({
  //         title,
  //         bodyHtml,
  //         imageTargetId,
  //         galleryTargetIds,
  //         tagIds: selectedTagIds.map(Number),
  //         categoryId: selectedCategoryId ? Number(selectedCategoryId) : undefined,
  //       });

  //       setSuccess(
  //         `Created blog node with id ${
  //           node?.nid?.[0]?.value ?? node?.nid ?? node?.id ?? "?"
  //         }`
  //       );
  //       setTitle("");
  //       setBodyHtml("");
  //       setImageFile(null);
  //       setGalleryFiles([]);
  //       setSelectedTagIds([]);
  //       setSelectedCategoryId("");
  //     } catch (e) {
  //       setError(e.message);
  //     } finally {
  //       setSubmitting(false);
  //     }
  //   }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h2>Create Blog</h2>

      {error && (
        <div style={{ color: "crimson", marginBottom: 12 }}>{error}</div>
      )}
      {success && (
        <div style={{ color: "seagreen", marginBottom: 12 }}>{success}</div>
      )}

      <form onSubmit={handleUpload}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Title
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              //   required
              style={{ width: "100%", padding: 8, marginTop: 4 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Body (HTML allowed)
            <textarea
              value={bodyHtml}
              onChange={(e) => setBodyHtml(e.target.value)}
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

        <div className="mb-3">
          <label className="form-label">Upload Picture</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onInput={handleFileChange}
          />
        </div>

        <GalleryDropzone files={galleryFiles} setFiles={setGalleryFiles} />

        <div style={{ marginBottom: 12 }}>
          <label>
            Tags
            <select
              multiple
              value={selectedTagIds}
              onChange={(e) =>
                setSelectedTagIds(
                  Array.from(e.target.selectedOptions).map((o) => o.value)
                )
              }
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

        <div style={{ marginBottom: 12 }}>
          <label>
            Category
            <select
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
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

        <button type="button" disabled={submitting}>
          {submitting ? "Creating..." : "Create"}
        </button>
        <br />
        <br />

        <button type="submit">upload the main image</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default BlogCreatePage;
