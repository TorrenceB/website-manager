import { createBrowserRouter } from "react-router-dom";

import { Posts, CreatePost } from "../pages";

const posts = {
  path: "/posts",
  element: <Posts />,
};
const createPost = {
  path: "/create-post",
  element: <CreatePost />,
};

const routes = [posts, createPost];

export default createBrowserRouter(routes);
