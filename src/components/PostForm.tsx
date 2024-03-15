import { useState, ChangeEvent, MouseEvent } from "react";
import { useNavigate } from "react-router";

import { Input, Markdown, Button, Chip } from "./index";
import { Tag } from "../types";

interface Props {
  tags: Tag[];
  onClear: () => void;
  onChange: (value: string) => void;
  onTagClick: (tag: Tag) => void;
  onTagAdd: (tag: Tag) => void;
  onTagDelete: (tag: Tag) => void;
}

const PostForm = ({
  tags,
  onClear,
  onChange,
  onTagAdd,
  onTagClick,
  onTagDelete,
}: Props) => {
  const [tag, setTag] = useState<Tag>({ id: "", title: "" });
  const [markdown, setMarkdown] = useState<string>("");
  const navigate = useNavigate();

  const selectedTags =
    tags && tags.length > 0 ? (
      <div>
        <h3>Selected Tags</h3>
        <div className="flex w-full gap-2">
          {tags.map((tag) => (
            <Chip
              key={tag.id}
              content={tag.title}
              onDelete={() => onTagDelete(tag)}
              color="bg-red-500"
            />
          ))}
        </div>
      </div>
    ) : (
      <h3>No Selected Tags</h3>
    );

  const chips = tags.map((tag) => (
    <Chip
      key={tag.id}
      content={tag.title}
      color="bg-deep-purple-gray"
      onClick={() => onTagClick(tag)}
    />
  ));

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        onClear();
        navigate("/posts");
      }}
    >
      <Input
        id="title"
        name="title"
        label="Title"
        type="text"
        onChange={({ target }) => onChange(target.value)}
      />
      <div className="flex items-end gap-x-2">
        <Input
          id="newTag"
          name="newTag"
          label="Add New Tag"
          type="text"
          value={tag.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const { value } = e.target;

            setTag({ ...tag, title: value });
          }}
        />
        <Button
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();

            onTagAdd(tag);

            setTag({ ...tag, title: "" });
          }}
        >
          Add Tag
        </Button>
      </div>
      <div>
        <h3>Available Tags</h3>
        <div className="flex items-center flex-wrap gap-2">{chips}</div>
      </div>
      {selectedTags}
      <Markdown value={markdown} onChange={(value) => onChange(value)} />
      <Button>Update</Button>
    </form>
  );
};

export default PostForm;
