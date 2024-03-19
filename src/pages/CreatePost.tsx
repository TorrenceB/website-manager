import { useEffect } from "react";

import { PostForm } from "../components";
import { usePost, useTags } from "../hooks";

const CreatePost = () => {
  const { post, setPost, createPost } = usePost();
  const { tags, createTag, fetchTags } = useTags();

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <PostForm
      post={post}
      tags={tags}
      setPost={setPost}
      buttonContent={"Create Post"}
      postAction={createPost}
    />
  );
};

export default CreatePost;
