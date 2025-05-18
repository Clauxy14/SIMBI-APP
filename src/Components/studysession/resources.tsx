import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./resources.css"; // Style it to match the screenshot

const Resources: React.FC = () => {
  const { _id } = useParams<{ _id: string }>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

   const getToken = (): string | null => {
    return (
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
    );
  };
  const handleUpload = async () => {
        const token = getToken();
        console.log(token)
    if (!_id || selectedFiles.length === 0) return;

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });
    formData.append("sessionId", _id);

    try {
      setUploading(true);
      const response = await fetch("https://simbi-ai.onrender.com/api/resources", {
         headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
        
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      alert("Files uploaded successfully!");
      setSelectedFiles([]);
    } catch (error) {
      console.error(error);
      alert("An error occurred while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="resources-container">
      <div className="upload-header">
        <h3>Upload Study Resources</h3>
        <p className="upload-subtext">
          Upload any supporting files for this study session.
        </p>
      </div>

      <div className="file-upload-box" onClick={() => fileInputRef.current?.click()}>
        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <p>Click to upload files or drag & drop</p>
        {selectedFiles.length > 0 && (
          <div className="file-list">
            {selectedFiles.map((file, idx) => (
              <p key={idx}>{file.name}</p>
            ))}
          </div>
        )}
      </div>

      <button
        className="upload-button"
        onClick={handleUpload}
        disabled={uploading || selectedFiles.length === 0}
      >
        {uploading ? "Uploading..." : "Upload Files"}
      </button>
    </div>
  );
};

export default Resources;
