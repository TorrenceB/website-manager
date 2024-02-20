import { useState, useEffect, ChangeEvent } from "react";
import { DocumentData, Timestamp } from "firebase/firestore";

import { Markdown, Input, Dropdown, Button } from "../components";
import Client from "../api/client";
import { tags } from "../plugins/firebase";
import { Post } from "../types";

const client = Client();

const CreatePost = () => {
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    body: "",
    tags: [],
    timestamp: new Timestamp(0, 0),
  });

  const [allTags, setAllTags] = useState<DocumentData[]>([]);
  const [errors, setErrors] = useState({});

  const fetchTags = async (): Promise<void> => {
    const data = await client.$list(tags);

    setAllTags(data);
  };

  const create = async () => {
    // const response = await client.$create({});
  };

  useEffect(() => {}, []);

  return (
    <form className="flex flex-col gap-y-4">
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
      <Dropdown id="tags" label="Tags" options={[]} />
      <Markdown
        value={post.body}
        onChange={(value) => setPost({ ...post, body: value })}
      />
      <Button>Create</Button>
    </form>
  );
};

export default CreatePost;
