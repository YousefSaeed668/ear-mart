import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface QuillEditorProps {
  onChange: (value: string) => void;
  value: string;
}
export function QuillEditor({ onChange, value }: QuillEditorProps) {
  return (
    <ReactQuill
      theme="snow"
      modules={{
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["clean"],
        ],
      }}
      value={value}
      onChange={onChange}
    />
  );
}
