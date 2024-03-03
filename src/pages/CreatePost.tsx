import { useState, useEffect, ChangeEvent } from "react";
import { Timestamp } from "firebase/firestore";

import { Markdown, Input, Button, AddNewTag } from "../components";
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

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        console.log("Submit triggered");

        // create.post();
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
        onTagAdd={(tag) => create.tag({ title: tag.title, id: tag.id })}
      />
      <Markdown
        value={post.body}
        onChange={(value) => setPost({ ...post, body: value })}
      />
      <Button>Create</Button>
    </form>
  );
};

export default CreatePost;
