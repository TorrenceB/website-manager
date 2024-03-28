import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

import { Button, PostCard, Icon } from "../components";
import { Post } from "../types";
import { posts } from "../plugins/firebase";

import Client from "../api/client";
import { Icons } from "../assets/data";
import { usePost } from "../hooks";
import Auth from "../api/authentication";

const client: Client = Client();
const auth = Auth();

const Posts = () => {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const { removePost } = usePost();

  const fetch = async (): Promise<void> => {
    const data = (await client.$list(posts)) as Post[];

    setBlogPosts(data);
    setIsFetchingPosts(false);
  };

  const handleDelete = async (id: string): Promise<void> => {
    await removePost(id);
    await fetch();
  };

  const handleSignOut = async () => {
    await auth.$signOut();
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

      <div className="w-40">
        <Link to={"/create-post"}>
          <Button>
            Create Post
            <Icon icon={Icons.plus} />
          </Button>
        </Link>
      </div>

      <div className="md:grid md:grid-cols-4">
        {isFetchingPosts ? (
          <ReactLoading type="bubbles" color="#00ccc5" />
        ) : (
          buildPosts
        )}
      </div>
      <div className="w-40">
        <Button onClick={handleSignOut}>
          <Icon icon={Icons.minus} />
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Posts;
