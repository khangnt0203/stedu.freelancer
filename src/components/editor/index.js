import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
function Editor({ description }) {

  return (
    <ReactQuill
      className="mb-16 md:mb-12"
      theme="snow"
      value={description}
      onChange={(e) => description(e)}
    />
  );
}

export default Editor;
