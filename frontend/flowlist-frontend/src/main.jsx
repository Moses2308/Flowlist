import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../stylesheets/reset.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";

import RootPage from "./pages/RootPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const browserRouter = createBrowserRouter([
  {
    path: "/",
    Component: RootPage,
    children: [
      {
        path: "/home",
        Component: HomePage,
      },
      {
        path: "/register",
        Component: RegisterPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={browserRouter} />,
);
