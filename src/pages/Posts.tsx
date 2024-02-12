import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DocumentData } from "firebase/firestore";

import { Button, PostCard, Icon } from "../components";
import { posts } from "../plugins/firebase";

import Client from "../api/client";
import { Icons } from "../assets/data";

const client = Client();

const Posts = () => {
  const [blogPosts, setBlogPosts] = useState<DocumentData[]>([]);

  const fetch = async (): Promise<void> => {
    const data = await client.$list(posts);

    setBlogPosts(data);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="grid justify-center gap-y-4 p-4 w-full">
      <h1>Blog Management</h1>

      <Link to={"/create-post"}>
        <Button>
          Create Post
          <Icon icon={Icons["plus"]} />
        </Button>
      </Link>

      {blogPosts && blogPosts?.length > 0
        ? blogPosts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              body={post.body}
              timestamp={post.timeStamp}
              tags={post.tags}
            />
          ))
        : "There are no posts"}
    </div>
  );
};

export default Posts;
