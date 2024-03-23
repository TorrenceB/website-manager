import { useParams } from "react-router";
import { useEffect } from "react";

import { PostForm } from "../components";
import { usePost, useTags } from "../hooks";

const UpdatePost = () => {
  const { post, fetchPost, updatePost, setPost } = usePost();
  const { tags, fetchTags, createTag } = useTags();
  const { id = "" } = useParams<string>();

  useEffect(() => {
    fetchPost(id);
    fetchTags();
  }, []);

  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Update Post</h1>
      <PostForm
        post={post}
        tags={tags}
        setPost={setPost}
        onCreateTag={createTag}
        postAction={() => updatePost(id)}
        buttonContent="Update Post"
      />
    </div>
  );
};

export default UpdatePost;
