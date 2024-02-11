import { useState, ChangeEvent } from "react";
import { MarkDown, Input, Dropdown, Button } from "../components";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({});

  return (
    <form className="flex flex-col gap-y-4">
      <Input
        id="title"
        name="title"
        label="Title"
        type="text"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;

          setTitle(value);
        }}
      />
      <Dropdown id="tags" label="Tags" options={options} />
      <MarkDown value={markdown} onChange={(value) => setMarkdown(value)} />
      <Button>Create</Button>
    </form>
  );
};

export default CreatePost;
