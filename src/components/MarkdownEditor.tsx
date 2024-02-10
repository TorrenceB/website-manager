import { Editor } from "@bytemd/react";
import { useState } from "react";

import "bytemd/dist/index.css";

const MarkdownEditor = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <label>Create Post</label>
      <Editor value={value} onChange={(value) => setValue(value)} />
    </div>
  );
};

export default MarkdownEditor;
