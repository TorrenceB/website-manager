import { createBrowserRouter } from "react-router-dom";

import { Posts, CreatePost, UpdatePost, Authentication } from "../pages";

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
const authentication = {
  path: "/auth",
  element: <Authentication />,
};

const routes = [posts, createPost, updatePost, authentication];

export default createBrowserRouter(routes);
