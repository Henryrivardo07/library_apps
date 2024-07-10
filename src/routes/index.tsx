import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";

import SignIn from "../pages/auth/login";
import SignUp from "../pages/auth/register";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/SignIn",
      element: <SignIn />,
    },
    {
      path: "/SignUp",
      element: <SignUp />,
    },
  ]);
  return (
    <>
      <div></div>
    </>
  );
};

export default Router;
