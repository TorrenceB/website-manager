import { useEffect } from "react";

import { PostForm } from "../components";
import { usePost, useTags } from "../hooks";

const CreatePost = () => {
  const { post, setPost, createPost } = usePost();
  const { tags, fetchTags } = useTags();

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <PostForm
      post={post}
      tags={tags}
      setPost={setPost}
      postAction={createPost}
      buttonContent="Create Post"
    />
  );
};

export default CreatePost;
