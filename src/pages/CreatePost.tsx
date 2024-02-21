import { useState, useEffect, ChangeEvent } from "react";
import { DocumentData, Timestamp } from "firebase/firestore";

import { Markdown, Input, Dropdown, Button } from "../components";
import Client from "../api/client";
import { tags, posts } from "../plugins/firebase";
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

  const create = async (): Promise<void> => {
    const response = await client.$create({ collection: posts, data: post });

    console.log("RESPONSE =>", response);
  };

  const options = allTags.map(({ title }) => title);

  useEffect(() => {
    fetchTags();
  }, []);

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
      <Dropdown
        id="tags"
        label="Tags"
        onSelect={(value) => {
          const selectedTag = allTags.find((tag) => tag.title === value);

          console.log("Selected =>", selectedTag);

          // setPost({...post, tags: [selectedTag]})
        }}
        options={options}
      />
      <Markdown
        value={post.body}
        onChange={(value) => setPost({ ...post, body: value })}
      />
      <Button onClick={create}>Create</Button>
    </form>
  );
};

export default CreatePost;
