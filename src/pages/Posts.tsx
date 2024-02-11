import { useState, useEffect } from "react";
import { Button, Plus } from "../components";
import { Link } from "react-router-dom";
import { posts } from "../plugins/firebase";
import Client from "../api/client";
import { DocumentData } from "firebase/firestore";

const client = Client();

const Posts = () => {
  const [blogPosts, setBlogPosts] = useState<DocumentData[]>([]);

  const fetchPosts = async (): Promise<void> => {
    const all = await client.$list(posts);

    setBlogPosts(all);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="grid justify-center gap-y-4 p-4 w-full">
      <h1>Blog Management</h1>

      <Link to={"/create-post"}>
        <Button>
          Create Post
          <Plus />
        </Button>
      </Link>
    </div>
  );
};

export default Posts;
