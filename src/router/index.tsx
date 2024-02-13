import { createBrowserRouter } from "react-router-dom";

import { Posts, CreatePost, UpdatePost } from "../pages";

const posts = {
  path: "/posts",
  element: <Posts />,
};
const createPost = {
  path: "/create-post",
  element: <CreatePost />,
};
const updatePost = {
  path: "/update-post/:id",
  element: <UpdatePost />,
};

const routes = [posts, createPost, updatePost];

export default createBrowserRouter(routes);
