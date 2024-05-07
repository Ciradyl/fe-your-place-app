import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const selectFileRef = useRef();

  useEffect(() => {
    if (!file) {
      return; //can't generate image preview
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const selectedFileHandler = (event) => {
    let selectedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      selectedFile = event.target.files[0];
      setFile(selectedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, selectedFile, fileIsValid);
  };

  const selecImageHandler = () => {
    selectFileRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={selectFileRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={selectedFileHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl ? (
            <img src={previewUrl} alt="preview" />
          ) : (
            <p>Please select an image.</p>
          )}
        </div>
        <Button type="button" onClick={selecImageHandler}>
          Select an Image
        </Button>
      </div>
      {!isValid && <p>{props.erroText}</p>}
    </div>
  );
};

export default ImageUpload;
