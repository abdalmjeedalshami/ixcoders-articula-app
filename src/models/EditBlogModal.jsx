import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDropzone } from "react-dropzone";
import TagSelector from "../components/common/tag_selector/TagSelector";
import { useTags } from "../utils/TagContext";
import GalleryDropzone from "../components/common/GalleryDropzone/GalleryDropzone";
import { editBlog } from "../utils/blog";
import colors from "../theme/colors";

function EditBlogModal({ show, handleClose, blog, onUpdated }) {
  const { tags } = useTags();

  const [galleryFiles, setGalleryFiles] = useState([]);

  const [title, setTitle] = useState(blog.title?.[0]?.value || "");
  const [body, setBody] = useState(blog.body?.[0]?.processed || "");
  const [gallery, setGallery] = useState(blog.field_gallery || []);
  const [selectedTagIds, setSelectedTagIds] = useState(
    blog.field_tags?.map((t) => t.target_id) || []
  );

  const [isDirty, setIsDirty] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (accepted) => {
      const mapped = accepted.map((file) =>
        Object.assign(file, {
          id: Math.random().toString(36).substring(2),
          preview: URL.createObjectURL(file),
        })
      );
      setGallery((curr) => [...curr, ...mapped]);
      setIsDirty(true);
    },
  });

  const removeFile = (id) => {
    setGallery((curr) => curr.filter((f) => f.id !== id));
    setIsDirty(true);
  };

  const [inputData, setInputData] = useState({
    type: [{ target_id: "blog" }],
    title: [{ value: title }],
    body: [{ value: body, format: "full_html" }],
    field_tags: selectedTagIds.map((id) => ({ target_id: id })),
    field_gallery: galleryFiles,
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSave = async () => {
    setSubmitting(true);
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const token = btoa(`${username}:${password}`);
    const blog_id = blog.nid?.[0].value;

    try {
      const result = await editBlog({
        id: blog_id,
        data: inputData,
        token: token,
      });
      console.log(result);

      const updated = await result;
      onUpdated(updated);
      handleClose();
      console.log("this is the ok response:" + updated);
      setSubmitting(false);

      return result;
    } catch (err) {
      console.error(err);
      setSubmitting(false);

      return null;
    }
  };

  const handleAttemptClose = () => {
    if (isDirty) {
      setShowConfirmModal(true);
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    const albumField = galleryFiles.map((file) => ({
      target_id: file,
    }));

    setInputData((prev) => ({
      ...prev,
      field_gallery: albumField,
    }));
  }, [galleryFiles]);

  return (
    <div>
      {/* Unsaved confirmation */}
      <Modal
        show={showConfirmModal}
        onHide={() => setShowConfirmModal(false)}
        centered
        contentClassName="rounded-0"
      >
        <Modal.Header closeButton>
          <Modal.Title>Unsaved Changes</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have unsaved changes. Are you sure you want to close without
          saving?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Stay
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setShowConfirmModal(false);
              handleClose();
            }}
          >
            Close Anyway
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit modal */}
      <Modal
        show={show}
        onHide={handleAttemptClose}
        size="lg"
        backdrop="static"
        contentClassName="rounded-0"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Title */}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={inputData.title[0].value}
                onChange={(e) => {
                  setIsDirty(true);
                  setInputData({
                    ...inputData,
                    title: [{ value: e.target.value }],
                  });
                  console.log("this is title:" + inputData.title[0].value);
                }}
              />
            </Form.Group>

            {/* Body */}
            <Form.Group className="mb-3">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={inputData.body[0].value}
                onChange={(e) => {
                  setBody(e.target.value);
                  setIsDirty(true);
                  setInputData({
                    ...inputData,
                    body: [{ value: e.target.value, format: "full_html" }],
                  });
                }}
              />
            </Form.Group>

            {/* Gallery */}
            <div className="mb-3">
              <label className="form-label">Current Gallery</label>
              <div
                {...getRootProps()}
                style={{
                  border: "2px dashed #ccc",
                  background: isDragActive ? "#f0f8ff" : "#fff",
                  textAlign: "center",
                  cursor: "pointer",
                  padding: 20,
                }}
              >
                <input {...getInputProps()} />
                <p>
                  {isDragActive
                    ? "Drop your images here..."
                    : "Click or drag images to upload"}
                </p>

                {gallery?.length > 0 && (
                  <div
                    style={{
                      marginTop: 12,
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(110px, 1fr))",
                      gap: 12,
                    }}
                  >
                    {gallery.map((file) => (
                      <div
                        key={file.id || file.url}
                        style={{
                          position: "relative",
                          border: "1px solid #e5e7eb",
                          borderRadius: 8,
                          overflow: "hidden",
                          background: "#fafafa",
                        }}
                      >
                        <img
                          src={file.preview || file.url}
                          alt={file.alt || file.name || "Image preview"}
                          style={{
                            width: "100%",
                            height: 100,
                            objectFit: "cover",
                          }}
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(file.id);
                          }}
                          style={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            background: "rgba(0,0,0,0.6)",
                            color: "#fff",
                            border: "none",
                            borderRadius: 4,
                            padding: "4px 6px",
                            cursor: "pointer",
                            fontSize: 12,
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* New Gallery */}
            <label className="form-label">New Gallery</label>
            <GalleryDropzone files={galleryFiles} setFiles={setGalleryFiles} />

            {/* Tags */}
            <TagSelector
              tags={tags}
              selectedTagIds={selectedTagIds}
              setSelectedTagIds={setSelectedTagIds}
              setInputData={setInputData}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleAttemptClose}
            className="rounded-0 border-0"
            style={{ backgroundColor: colors.blackBackground }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSave}
            className="rounded-0 border-0"
            style={{ backgroundColor: colors.primary }}
          >
            {submitting ? "Saving.." : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditBlogModal;
