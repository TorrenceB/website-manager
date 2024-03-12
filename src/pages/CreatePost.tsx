import { useState, useEffect, ChangeEvent } from "react";
import { Timestamp } from "firebase/firestore";

import { Markdown, Input, Button, AddNewTag, Chip } from "../components";
import { tags, posts } from "../plugins/firebase";
import { Post, Tag } from "../types";

import Client from "../api/client";

const client: Client = Client();

const CreatePost = () => {
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    body: "",
    tags: [],
    timestamp: new Timestamp(0, 0),
  });

  const [allTags, setAllTags] = useState<Tag[]>([]);

  const fetchTags = async (): Promise<void> => {
    const data = (await client.$list(tags)) as Tag[];

    setAllTags(data);
  };

  const create = {
    post: async (): Promise<void> => {
      const response = await client.$create({
        collection: posts,
        data: post,
      });

      console.log("RESPONSE =>", response);
    },
    tag: async (tag: Tag): Promise<void> => {
      const { id, title } = await client.$create({
        collection: tags,
        data: { title: tag.title },
      });

      const newTag: Tag = {
        id,
        title,
      };

      setAllTags([...allTags, newTag]);
    },
  };

  const handleDelete = (id: string): void => {
    const tags = post.tags.filter((tag) => tag.id !== id);

    setPost({ ...post, tags });
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
              onDelete={() => handleDelete(tag.id)}
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

        create.post();

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
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const { value } = e.target;

          setPost({ ...post, title: value });
        }}
      />
      <AddNewTag
        tags={allTags}
        onTagAdd={(tag) => create.tag(tag)}
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
