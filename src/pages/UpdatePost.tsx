import { useParams, useNavigate } from "react-router";
import { useState, useEffect, ChangeEvent } from "react";
import { Timestamp } from "firebase/firestore";

import {
  Chip,
  PostForm,
  Input,
  AddNewTag,
  Markdown,
  Button,
} from "../components";
import { usePost, useTags } from "../hooks";

const UpdatePost = () => {
  const { post, setPost, fetchPost, updatePost } = usePost();
  const { tags, fetchTags, createTag } = useTags();
  const { id = "" } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost(id);
    fetchTags();
  }, []);

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
              color="bg-red-500"
            />
          ))}
        </div>
      </div>
    ) : (
      <h3>No Selected Tags</h3>
    );

  return (
    // <PostForm />
    <form
      className="flex flex-col gap-y-4"
      onSubmit={(e) => {
        e.preventDefault();

        updatePost(id);

        setPost({
          id: "",
          title: "",
          body: "",
          tags: [],
          timestamp: new Timestamp(0, 0),
        });

        navigate("/posts");
      }}
    >
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
      <AddNewTag
        tags={tags}
        onTagAdd={async (tag): Promise<void> => createTag(tag)}
        onTagClick={(tag) => {
          const tagDoesntExist = !post.tags.some(({ id }) => id === tag.id);
          const tags = [...post.tags, tag];

          if (tagDoesntExist) setPost({ ...post, tags });
        }}
      />
      {selectedTags}
      <Markdown
        value={post.body}
        onChange={(value) => setPost({ ...post, body: value })}
      />
      <Button>Update</Button>
    </form>
  );
};

export default UpdatePost;
