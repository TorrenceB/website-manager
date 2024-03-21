import { Editor, Viewer } from "@bytemd/react";

import "bytemd/dist/index.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Markdown = ({ value, onChange }: Props) => {
  return (
    <div>
      <label>Post</label>
      <Editor value={value} onChange={onChange} />
    </div>
  );
};

export default Markdown;
