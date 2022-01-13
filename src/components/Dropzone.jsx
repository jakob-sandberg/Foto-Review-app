import React from "react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";
import useUploadImage from "../hooks/useUploadImage";
import "../css/dropzone.css";

const Dropzone = () => {
  const uploadImage = useUploadImage();
  const { id } = useParams();
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles.length) {
      return;
    }

    uploadImage.mutate(acceptedFiles, id);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: "image/gif, image/jpeg, image/png, image/webp",
    onDrop,
  });

  return (
    <>
      <div
        {...getRootProps()}
        id="wrapper"
        className={`${isDragAccept ? "drag-accept" : ""} ${
          isDragReject ? "drag-reject" : ""
        }`}
      >
        <input {...getInputProps()} />

        <div>
          {isDragActive ? (
            isDragAccept ? (
              <span>That's a good file</span>
            ) : (
              <span>Drag your image to this area!</span>
            )
          ) : (
            <span>Drag your image to this area!</span>
          )}
        </div>

        {uploadImage.error && <span>{uploadImage.error}</span>}
      </div>
    </>
  );
};

export default Dropzone;
