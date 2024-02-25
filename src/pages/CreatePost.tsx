import { useState, useEffect, ChangeEvent } from "react";
import { DocumentData, Timestamp } from "firebase/firestore";

import { Markdown, Input, Button, AddNewTag } from "../components";
import Client from "../api/client";
import { tags, posts } from "../plugins/firebase";
import { Post, Tag } from "../types";

const client = Client();

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
    const data = await client.$list(tags);

    setAllTags(data as Tag[]);
  };

  const create = {
    post: async (): Promise<void> => {
      const response = await client.$create({ collection: posts, data: post });

      console.log("RESPONSE =>", response);
    },
    tag: async (tag: string): Promise<void> => {
      const { data } = await client.$create({
        collection: tags,
        data: { title: tag },
      });

      setAllTags([...allTags, data as Tag]);
    },
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        // create.post();
      }}
      className="flex flex-col gap-y-4"
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
      <AddNewTag tags={allTags} onTagAdd={(tag) => create.tag(tag)} />
      <Markdown
        value={post.body}
        onChange={(value) => setPost({ ...post, body: value })}
      />
      <Button>Create</Button>
    </form>
  );
};

export default CreatePost;
