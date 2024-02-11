import { createBrowserRouter } from "react-router-dom";

import { Home, CreatePost } from "../pages";

const home = {
  path: "/",
  element: <Home />,
};
const createPost = {
  path: "/create-post",
  element: <CreatePost />,
};

const routes = [home, createPost];

export default createBrowserRouter(routes);
