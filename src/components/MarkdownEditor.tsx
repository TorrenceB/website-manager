import { Editor } from "@bytemd/react";
import { useState } from "react";

import "bytemd/dist/index.css";

const MarkdownEditor = () => {
  const [value, setValue] = useState("");

  return <Editor value={value} onChange={(value) => setValue(value)} />;
};

export default MarkdownEditor;
