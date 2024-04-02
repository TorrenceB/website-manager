import React from "react";
import ReactDOM from "react-dom/client";

import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import router from "./router";
import "./index.css";
import { Authentication } from "./pages";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Authentication>
      <RouterProvider router={router} />
      <Toaster />
    </Authentication>
  </React.StrictMode>
);
