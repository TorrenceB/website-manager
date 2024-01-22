import { createBrowserRouter } from "react-router-dom";

import { Home } from "../pages";

const home = {
  path: "/",
  element: <Home />,
};

const routes = [home];

export default createBrowserRouter(routes);
