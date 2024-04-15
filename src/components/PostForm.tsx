import { useState, useRef, ChangeEvent, MouseEvent, FormEvent } from "react";
import { useNavigate } from "react-router";

import { Input, Markdown, Button, Chip, Icon } from "./index";
import { Tag, Post } from "../types";
import Storage from "../api/storage";
import toast from "react-hot-toast";
import { Icons } from "../assets/data";

const storage = Storage();

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
  const [image, setImage] = useState<File>();
  const fileRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleTagClick = (tag: Tag) => {
    const tagDoesntExist = !post.tags.some(({ id }) => id === tag.id);
    const tags = [...post.tags, tag];

    if (tagDoesntExist) setPost({ ...post, tags });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // await storage.$upload({ path: image.name, file: image });

    postAction("");

    setPost({
      id: "",
      title: "",
      body: "",
      image: "",
      tags: [],
      date: new Date(),
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

  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files) {
      const image = files[0];

      setImage(image);

      if (image) {
        toast.success(`${image.name} uploaded!`, { position: "bottom-center" });
      }
    }
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
    </div>
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

  const uploadImage = (
    <>
      <label>Upload Image</label>
      <div className="bg-gray-200 rounded-md flex flex-col justify-center items-center p-4 gap-4">
        <Icon icon={Icons.upload} size="w-10 h-10" color="#00ccc5" />
        <p className="text-xs font-bold">Choose file to upload from device</p>
        <div className="w-1/4">
          <Button
            onClick={(e: MouseEvent) => {
              e.preventDefault();

              fileRef.current?.click();
            }}
          >
            Select Image
          </Button>
        </div>
      </div>
      <div>
        <Input
          id="image"
          type="file"
          innerRef={fileRef}
          onChange={handleSelectImage}
        />
      </div>
    </>
  );

  const uploadedImages = image ? (
    <div className="flex flex-col gap-4">
      <div className="bg-gray-200 rounded-md p-4 flex items-center gap-4">
        <Icon icon={Icons.image} size="w-8 h-8" color="#000" />
        <h3>{image.name}</h3>
        <Icon
          icon={Icons["x-mark"]}
          size="w-8 h-8"
          color="#000"
          className="ml-auto"
          onClick={() => setImage(undefined)}
        />
      </div>
    </div>
  ) : (
    <></>
  );
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

  const submitButton = (
    <div className="w-1/4 ml-auto">
      <Button isDisabled={!isFormValid(post)}>{buttonContent}</Button>
    </div>
  );

  return (
    <form
      className="flex flex-col gap-y-4 w-[50rem] rounded-md m-auto shadow-lg p-4"
      onSubmit={handleSubmit}
    >
      {title}
      {newTag}
      {createNewTag}
      {allTags}
      {selectedTags}
      {uploadImage}
      {uploadedImages}
      {markdown}
      {submitButton}
    </form>
  );
};

export default PostForm;
