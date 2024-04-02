import { createBrowserRouter } from "react-router-dom";

import { Posts, CreatePost, UpdatePost, SignIn } from "../pages";

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
const signIn = {
  path: "/signin",
  element: <SignIn />,
};

const routes = [posts, createPost, updatePost, signIn];

export default createBrowserRouter(routes);
