// BlogModal.js
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  createBlog,
  uploadMultipleImages,
  uploadSingleImage,
} from "../../../utils/blog";
import GalleryDropzone from "../../common/GalleryDropzone/GalleryDropzone";
import TagSelector from "../../common/tag_selector/TagSelector";
import CategorySelector from "../../common/category_selector/CategorySelector";
import MyButton from "../../common/my_button/MyButton";
import colors from "../../../theme/colors";

const CreateBlogModal = ({
  show,
  handleCloseConfirmed,
  articleAddedFun,
  tags,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [status, setStatus] = useState("");

  const [title, setTitle] = useState("");
  const [galleryFiles, setGalleryFiles] = useState([]);
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

        const [categoryRes] = await Promise.all([
          fetch("https://tamkeen-dev.com/api/terms/category", { headers }),
        ]);

        if (!categoryRes.ok) {
          throw new Error("Failed to fetch one or more taxonomy endpoints");
        }

        const [categoryData] = await Promise.all([categoryRes.json()]);

        setCategories(categoryData);

        console.info("Taxonomy terms loaded successfully");
      } catch (error) {
        console.error("Error fetching taxonomy terms:", error);
        setError(error.message);
      }
    }

    fetchTaxonomyData();
  }, []);

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

  const handleCreateBlog = async () => {
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

      if (result) {
        setMessage("Blog posted ✅");
        articleAddedFun();
        handleCloseConfirmed();
      }

      return result;
    } catch (err) {
      setMessage("Blog did not post ❌");
      console.error("Blog creation error:", err);
      setError(err);
      return null; // Optional: make return type predictable
    } finally {
      setSubmitting(false);
    }
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const handleCloseAttempt = () => {
    setShowConfirm(true); // Show confirmation dialog
  };

  const confirmClose = () => {
    setShowConfirm(false);
    handleCloseConfirmed(); // Actually close modal
  };

  const cancelClose = () => {
    setShowConfirm(false); // Stay in modal
  };

  return (
    <>
      {!showConfirm && (
        <Modal
          show={show}
          onHide={handleCloseAttempt}
          backdrop="static"
          keyboard={false}
          contentClassName="rounded-0"
        >
          <Modal.Header closeButton onHide={handleCloseAttempt}>
            <Modal.Title>Create New Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="p-2">
              {error && (
                <div style={{ color: "crimson", marginBottom: 12 }}>
                  {error}
                </div>
              )}
              {success && (
                <div style={{ color: "seagreen", marginBottom: 12 }}>
                  {success}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateBlog(e);
                }}
                className="d-flex flex-column gap-3"
              >
                {/* Title */}
                <div>
                  <label className="form-label">Title</label>
                  <input
                    required
                    className="d-block w-100 p-2 form-control"
                    type="text"
                    placeholder="blog title"
                    onChange={(e) =>
                      setInputData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* Body */}
                <div>
                  <label className="form-label">Body (HTML allowed)</label>
                  <textarea
                    required
                    className="w-100 form-control"
                    onChange={(e) =>
                      setInputData((prev) => ({
                        ...prev,
                        body: e.target.value,
                      }))
                    }
                    rows={10}
                    placeholder="e.g. The standard Lorem Ipsum passage, <b>used since the 1500s</b>..."
                    style={{
                      fontFamily: "monospace",
                    }}
                  />
                </div>

                {/* image */}
                <div>
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
                <GalleryDropzone
                  files={galleryFiles}
                  setFiles={setGalleryFiles}
                />

                {/* Tags */}
                <TagSelector
                  tags={tags}
                  selectedTagIds={selectedTagIds}
                  setSelectedTagIds={setSelectedTagIds}
                  setInputData={setInputData}
                />

                {/* Category */}
                <CategorySelector
                  variant="form"
                  categories={categories}
                  selectedCategoryId={selectedCategoryId}
                  setSelectedCategoryId={setSelectedCategoryId}
                  setInputData={setInputData}
                />

                {/* Create Button */}
                <div className="border-top pt-3 text-end">
                  <MyButton
                    text={"Cancel"}
                    // disabled={submitting}
                    onClick={handleCloseAttempt}
                    backgroundColor={colors.secondary}
                    color={colors.primary}
                    classes="me-2"
                  />
                  <MyButton
                    text={submitting ? "Creating..." : "Create"}
                    disabled={submitting}
                    type="submit"
                  />
                </div>
              </form>
              {/* {message && <p className="mt-3">{message}</p>} */}
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <Modal
          show={showConfirm}
          onHide={cancelClose}
          centered
          contentClassName="rounded-0"
        >
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You have unsaved changes. Are you sure you want to close this blog
            form?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelClose}>
              No, Stay
            </Button>
            <Button variant="danger" onClick={confirmClose}>
              Yes, Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default CreateBlogModal;
