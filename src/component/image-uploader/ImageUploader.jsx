import React, { useRef } from "react";
import FormItem from "../commons/form-item";

const ImageUploader = (props,ref) => {
  const dropArea = useRef(null);
  return (
    <div className="border border-dotted p-3">
      {" "}
      <div
        ref={dropArea}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
          props.onChange(e.dataTransfer.files);
        }}
        className="flex items-center justify-center flex-col h-full w-full"
      >
        <h6>Drag & Drop File Here</h6>
        <span className="text-muted">OR</span>
        <FormItem type="file" name="picture" {...props} ref={ref}/>
      </div>
    </div>
  );
};

export default React.forwardRef(ImageUploader);
