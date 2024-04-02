import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";

import { Button, PostCard, Icon } from "../components";
import { Post } from "../types";
import { posts } from "../plugins/firebase";

import Client from "../api/client";
import Auth from "../api/authentication";
import { Icons } from "../assets/data";
import { usePost } from "../hooks";
import { useAuth } from "../context";

const client: Client = Client();
const authentication: Auth = Auth();

const Posts = () => {
  const [blogPosts, setBlogPosts] = useState<Post[]>([]);
  const [isFetchingPosts, setIsFetchingPosts] = useState(true);
  const { setAuth } = useAuth();
  const { removePost } = usePost();
  const navigate = useNavigate();

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
    await authentication.$signOut();

    setAuth({ token: "", isAuthenticated: false });
    navigate("/signin");
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
          Sign Out
          <Icon icon={Icons["arrow-out-right"]} />
        </Button>
      </div>
    </div>
  );
};

export default Posts;
