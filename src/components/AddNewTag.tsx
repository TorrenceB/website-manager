import { useState, ChangeEvent } from "react";

import { Chip, Input, Button } from "../components";
import { Tag } from "../types";

interface Props {
  tags: Tag[];
  onTagAdd: (tag: Tag) => void;
}

const AddNewTag = ({ tags = [], onTagAdd }: Props) => {
  const [tag, setTag] = useState<Tag>({ id: "", title: "" });

  const chips = tags.map((tag) => (
    <Chip
      key={tag.id}
      content={tag.title}
      isClickable={true}
      color="bg-deep-purple-gray"
    />
  ));

  return (
    <div>
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
          onClick={() => {
            onTagAdd(tag);

            setTag({ ...tag, title: "" });
          }}
        >
          Add Tag
        </Button>
      </div>
      <div className="flex items-center flex-wrap gap-2 mt-6">{chips}</div>
    </div>
  );
};

export default AddNewTag;
