import { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";

function formatBytes(bytes) {
  if (!bytes && bytes !== 0) return "";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

export default function GalleryDropzone({ files, setFiles }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      const withPreview = acceptedFiles.map((file) =>
        Object.assign(file, {
          id:
            (crypto?.randomUUID && crypto.randomUUID()) ||
            `${file.name}-${file.size}-${file.lastModified}`,
          preview: URL.createObjectURL(file),
        })
      );

      // Merge with existing and de-duplicate by name+size+lastModified
      setFiles((prev) => {
        const merged = [...prev, ...withPreview];
        const unique = merged.filter(
          (f, idx, arr) =>
            idx ===
            arr.findIndex(
              (g) =>
                g.name === f.name &&
                g.size === f.size &&
                g.lastModified === f.lastModified
            )
        );
        return unique;
      });
    },
    [setFiles]
  );

  const removeFile = useCallback(
    (id) => {
      setFiles((prev) => {
        const file = prev.find((f) => f.id === id);
        if (file?.preview) URL.revokeObjectURL(file.preview);
        return prev.filter((f) => f.id !== id);
      });
    },
    [setFiles]
  );

  // Revoke previews on unmount
  useEffect(() => {
    return () => {
      files?.forEach((file) => file.preview && URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  return (
    <div>
      <div
      className="p-3"
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          background: isDragActive ? "#f0f8ff" : "#fff",
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <p>
          {isDragActive
            ? "Drop your images here..."
            : "Click or drag images to upload"}
        </p>

        {files?.length > 0 && (
          <div
            style={{
              marginTop: 12,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
              gap: 12,
              alignItems: "start",
            }}
          >
            {files.map((file) => (
              <div
                key={file.id}
                style={{
                  position: "relative",
                  border: "1px solid #e5e7eb",
                  borderRadius: 8,
                  overflow: "hidden",
                  background: "#fafafa",
                }}
              >
                <img
                  src={file.preview}
                  alt={file.name}
                  style={{
                    width: "100%",
                    height: 100,
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file.id);
                  }}
                  aria-label={`Remove ${file.name}`}
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

      {files?.length > 0 && (
        <div style={{ marginTop: 8 }}>
          <strong>Selected images:</strong>
          <ul style={{ margin: "8px 0 0", paddingLeft: 18 }}>
            {files.map((file) => (
              <li key={`li-${file.id}`} style={{ marginBottom: 6 }}>
                {file.name} — {formatBytes(file.size)}
                <button
                  type="button"
                  onClick={() => removeFile(file.id)}
                  style={{
                    marginLeft: 8,
                    background: "transparent",
                    color: "#d00",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
