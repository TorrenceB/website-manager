import { useParams } from "react-router";
import { useEffect } from "react";

import { PostForm } from "../components";
import { usePost, useTags } from "../hooks";

const UpdatePost = () => {
  const { post, fetchPost, updatePost, setPost } = usePost();
  const { tags, fetchTags } = useTags();
  const { id = "" } = useParams<string>();

  useEffect(() => {
    fetchPost(id);
    fetchTags();
  }, []);

  return (
    <PostForm
      post={post}
      tags={tags}
      setPost={setPost}
      buttonContent={"Update Post"}
      postAction={() => updatePost(id)}
    />
  );
};

export default UpdatePost;
