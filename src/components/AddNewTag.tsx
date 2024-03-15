import { useState, ChangeEvent, MouseEvent } from "react";

import { Chip, Input, Button } from "../components";
import { Tag } from "../types";

interface Props {
  tags?: Tag[];
  onTagAdd: (tag: Tag) => void;
  onTagClick: (tag: Tag) => void;
}

const AddNewTag = ({ tags = [], onTagAdd, onTagClick }: Props) => {
  const [tag, setTag] = useState<Tag>({ id: "", title: "" });

  const chips = tags.map((tag) => (
    <Chip
      key={tag.id}
      content={tag.title}
      color="bg-deep-purple-gray"
      onClick={() => onTagClick(tag)}
    />
  ));

  return (
    <>
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
    </>
  );
};

export default AddNewTag;
