import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../stylesheets/reset.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider, redirect } from "react-router";

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
        action: registerAction,
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

async function registerAction({ request, url, params, pattern, context }) {
  //form data object creation
  const formData = await request.formData();

  const formObject = {};
  for (const property of await formData.entries()) {
    formObject[property[0]] = property[1] === "on" ? true : property[1];
  }
  console.log(formObject);

  //request to create user
  try {
    //request to register the user
    const registerResponse = await fetch("/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: formObject }),
    });

    //checking the resposne to see if db query succeeded
    if (!registerResponse.ok) {
      throw new Error("registration failed");
    } else {
      console.log(await registerResponse.json());
      console.log("REGISTRATION SUCCESSFUL");
    }

    //subsequent request to log in user with same credentials
    const loginResponse = await fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formObject.email,
        password: formObject.password,
      }),
      credentials: "include",
    });

    if (!loginResponse.ok) {
      throw new Error("login failed");
    } else {
      console.log(await loginResponse.json());
      console.log("LOGIN SUCCESSFUL");
    }

    return redirect("/home");
  } catch (error) {
    console.log(error.message);
  }
}
