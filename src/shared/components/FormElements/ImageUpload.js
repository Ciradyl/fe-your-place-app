import React, { useRef } from "react";

import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const selectFileRef = useRef();

  const selectedFileHandler = (event) => {
    console.log(event.target);
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
          <img src="" alt="preview" />
        </div>
        <Button type="button" onClick={selecImageHandler}>
          Select an Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
