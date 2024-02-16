import { useParams } from "react-router";
import { useState, useEffect, ChangeEvent } from "react";

import { Markdown, Input, Dropdown, Button } from "../components";
import { Post } from "../types";
import Client from "../api/client";

const client: Client = Client();

const UpdatePost = () => {
  const [post, setPost] = useState<Post>({} as Post);
  const [tags, setTags] = useState<string[]>([]);
  const { id = "" } = useParams<string>();

  const fetch = async (): Promise<void> => {
    const post = await client.$get({ id, path: "posts" });
    const tags = post.tags.map(({ title }: { title: string }) => title);

    setTags(tags);
    setPost(post as Post);
  };

  useEffect(() => {
    fetch();
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
      <Dropdown id="tags" label="Tags" options={tags} />
      {/* <Markdown value={post.body} onChange={() => {}} /> */}
      <Button>Update</Button>
    </form>
  );
};

export default UpdatePost;
