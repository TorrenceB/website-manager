import { useState, ChangeEvent, MouseEvent, FormEvent } from "react";
import { useNavigate } from "react-router";
import { Timestamp } from "firebase/firestore";

import { Input, Markdown, Button, Chip } from "./index";
import { Tag, Post } from "../types";

interface Props {
  post: Post;
  tags: Tag[];
  buttonContent: string;
  setPost: (post: Post) => void;
  postAction: (id: string) => Promise<void>;
  onCreateTag: (tag: Tag) => void;
}

const PostForm = ({
  post,
  tags,
  buttonContent,
  postAction,
  setPost,
  onCreateTag,
}: Props) => {
  const [tag, setTag] = useState<Tag>({ id: "", title: "" });
  const navigate = useNavigate();

  const handleTagClick = (tag: Tag) => {
    const tagDoesntExist = !post.tags.some(({ id }) => id === tag.id);
    const tags = [...post.tags, tag];

    if (tagDoesntExist) setPost({ ...post, tags });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    postAction("");

    setPost({
      id: "",
      title: "",
      body: "",
      tags: [],
      timestamp: new Timestamp(0, 0),
    });

    navigate("/posts");
  };

  const isFormValid = (post: Post): boolean => {
    const keys = ["title", "body", "tags"];

    return keys.every((key) => {
      const property = post[key as keyof Post];

      if (Array.isArray(property)) {
        return property.length > 0;
      }

      return property;
    });
  };

  const selectedTags =
    post.tags && post.tags.length > 0 ? (
      <div>
        <h3>Selected Tags</h3>
        <div className="flex w-full gap-2">
          {post.tags.map((tag) => (
            <Chip
              key={tag.id}
              content={tag.title}
              onDelete={() =>
                setPost({
                  ...post,
                  tags: post.tags.filter(({ id }) => tag.id !== id),
                })
              }
              color="bg-lavender-blush"
            />
          ))}
        </div>
      </div>
    ) : (
      <h3>No Selected Tags</h3>
    );

  const title = (
    <Input
      id="title"
      name="title"
      label="Title"
      type="text"
      value={post.title}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;

        setPost({ ...post, title: value });
      }}
    />
  );

  const newTag = (
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
  );

  const createNewTag = (
    <div className="w-1/4 ml-auto">
      <Button
        isDisabled={tag.title.length === 0}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();

          onCreateTag(tag);

          setTag({ ...tag, title: "" });
        }}
      >
        Add Tag
      </Button>
    </div>
  );

  const markdown = (
    <Markdown
      value={post.body}
      onChange={(value) => setPost({ ...post, body: value })}
    />
  );

  const chips = tags?.map((tag) => (
    <Chip
      key={tag.id}
      content={tag.title}
      color="bg-azure"
      onClick={() => handleTagClick(tag)}
    />
  ));

  const allTags = (
    <div>
      {tags && tags.length > 0 ? (
        <h3>Available Tags</h3>
      ) : (
        <h3>No Available Tags</h3>
      )}
      <div className="flex items-center flex-wrap gap-2">{chips}</div>
    </div>
  );

  return (
    <form
      className="flex flex-col gap-y-4 w-[50rem] rounded-md m-auto shadow-lg p-4"
      onSubmit={handleSubmit}
    >
      {title}
      <div className="flex items-end gap-x-2">{newTag}</div>
      {createNewTag}
      {allTags}
      {selectedTags}
      {markdown}
      <div className="w-1/4 ml-auto">
        <Button isDisabled={!isFormValid(post)}>{buttonContent}</Button>
      </div>
    </form>
  );
};

export default PostForm;
