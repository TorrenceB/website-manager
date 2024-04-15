import { useState } from "react";
import toast from "react-hot-toast";

import { Post } from "../types";
import { posts } from "../plugins/firebase";
import { getDate } from "../utils/get-date";
import Client from "../api/client";

const client = Client();

const usePost = () => {
  const [post, setPost] = useState<Post>({
    id: "",
    title: "",
    body: "",
    image: "",
    tags: [],
    date: new Date(),
  });

  const fetchPost = async (id: string): Promise<void> => {
    const data = (await client.$get({ id, path: "posts" })) as Post;

    setPost(data);
  };

  const createPost = async (): Promise<void> => {
    /**
     * @todo - add "isOk" property to response and
     * replace if block condition ?
     *
     * */
    const response = await client.$create({
      collection: posts,
      data: { ...post, date: getDate(post.date) },
    });

    if (response) {
      toast.success("Post created!", {
        position: "bottom-center",
      });
    }
  };

  const updatePost = async (id: string): Promise<void> => {
    await client.$mutate({ path: "posts", id, data: post });

    toast.success(`Post ${id} updated!`, {
      position: "bottom-center",
    });
  };

  const removePost = async (id: string): Promise<void> => {
    await client.$delete({ path: "posts", id });

    toast.success(`Post ${id} deleted!`, {
      position: "bottom-center",
    });
  };

  return {
    post,
    setPost,
    fetchPost,
    updatePost,
    removePost,
    createPost,
  };
};

export default usePost;
