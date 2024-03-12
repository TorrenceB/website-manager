import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Button, PostCard, Icon } from "../components";
import { Post } from "../types";
import { posts } from "../plugins/firebase";

import Client from "../api/client";
import { Icons } from "../assets/data";

const client: Client = Client();

const Posts = () => {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);

  const fetch = async (): Promise<void> => {
    const data = (await client.$list(posts)) as Post[];

    setBlogPosts(data);
  };

  const handleDelete = async (id: string): Promise<void> => {
    await client.$delete({ path: "posts", id });

    await fetch();
  };

  useEffect(() => {
    fetch();
  }, []);

  const buildPosts =
    blogPosts && blogPosts?.length > 0
      ? blogPosts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onDelete={() => handleDelete(post.id)}
          />
        ))
      : "There are no posts";

  return (
    <div className="flex flex-col justify-center gap-y-4 p-4 w-full">
      <h1>Blog Management</h1>

      <Link to={"/create-post"}>
        <Button>
          Create Post
          <Icon icon={Icons.plus} />
        </Button>
      </Link>

      {buildPosts}
    </div>
  );
};

export default Posts;
