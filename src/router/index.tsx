import { createBrowserRouter } from "react-router-dom";

import { Posts, CreatePost, UpdatePost, SignIn } from "../pages";
import ProtectedRoute from "../auth/ProtectedRoute";

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
const protectedRoutes = {
  path: "/",
  element: <ProtectedRoute />,
  children: [posts, createPost, updatePost],
};

const routes = [protectedRoutes, signIn];

export default createBrowserRouter(routes);
