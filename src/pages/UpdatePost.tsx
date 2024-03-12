import { useParams, useNavigate } from "react-router";
import { useState, useEffect, ChangeEvent } from "react";
import { Timestamp } from "firebase/firestore";

import { Markdown, Input, AddNewTag, Button, Chip } from "../components";
import { Post, Tag } from "../types";
import { tags } from "../plugins/firebase";

import Client from "../api/client";

const client: Client = Client();

const UpdatePost = () => {
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    body: "",
    tags: [],
    timestamp: new Timestamp(0, 0),
  });
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const { id = "" } = useParams<string>();
  const navigate = useNavigate();

  const fetch = {
    post: async (): Promise<void> => {
      const data = (await client.$get({ id, path: "posts" })) as Post;

      setPost(data);
    },
    tags: async (): Promise<void> => {
      const data = (await client.$list(tags)) as Tag[];

      setAllTags(data);
    },
  };

  const handleTagDelete = (id: string): void => {
    const tags = post.tags.filter((tag) => tag.id !== id);

    setPost({ ...post, tags });
  };

  const updatePost = async (): Promise<void> => {
    await client.$mutate({ path: "posts", id, data: post });
  };

  useEffect(() => {
    fetch.post();
    fetch.tags();
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
              onDelete={() => handleTagDelete(tag.id)}
              color="bg-red-500"
            />
          ))}
        </div>
      </div>
    ) : (
      <h3>No Selected Tags</h3>
    );

  return (
    <form
      className="flex flex-col gap-y-4"
      onSubmit={(e) => {
        e.preventDefault();

        updatePost();

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
        tags={allTags}
        onTagAdd={async (tag: Tag): Promise<void> => {
          const { id, title } = await client.$create({
            collection: tags,
            data: { title: tag.title },
          });

          const newTag: Tag = {
            id,
            title,
          };

          setAllTags([...allTags, newTag]);
        }}
        onTagClick={(tag: Tag) => {
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
