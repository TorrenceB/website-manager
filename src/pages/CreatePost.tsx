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
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Create Post</h1>
      <PostForm
        post={post}
        tags={tags}
        setPost={setPost}
        postAction={createPost}
        buttonContent="Create Post"
      />
    </div>
  );
};

export default CreatePost;
