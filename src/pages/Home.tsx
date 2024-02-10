import { ChangeEvent, useState } from "react";
import { MarkdownEditor, Input, Dropdown } from "../components";

const Home = () => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([
    "Ecommerce Project",
    "Self Development",
  ]);
  const [errors, setErrors] = useState({});

  return (
    <div className="grid justify-center gap-y-4 p-4">
      <h1 className="text-center">Blog Management</h1>

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
        <MarkdownEditor />
      </form>
    </div>
  );
};

export default Home;
