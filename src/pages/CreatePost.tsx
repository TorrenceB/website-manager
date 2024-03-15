import { useEffect } from "react";
import { Timestamp } from "firebase/firestore";

import {
  PostForm,
  Chip,
  Input,
  Button,
  AddNewTag,
  Markdown,
} from "../components";
import { usePost, useTags } from "../hooks";

const CreatePost = () => {
  const { post, createPost, setPost } = usePost();
  const { tags, fetchTags, createTag } = useTags();

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

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        createPost();

        setPost({
          id: "",
          title: "",
          body: "",
          tags: [],
          timestamp: new Timestamp(0, 0),
        });
      }}
      className="flex flex-col gap-y-4 p-6"
    >
      <Input
        id="title"
        name="title"
        label="Title"
        type="text"
        value={post.title}
        onChange={({ target }) => setPost({ ...post, title: target.value })}
      />
      <AddNewTag
        tags={tags}
        onTagAdd={(tag) => createTag(tag)}
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
      <Button>Create</Button>
    </form>
  );
};

export default CreatePost;
