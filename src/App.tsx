// src/App.tsx
import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/home";
import SignIn from "./pages/auth/login";
import SignUp from "./pages/auth/register";
import DetailPages from "./pages/detailPages";
import CategoryPages from "./pages/category";
import ShowAll from "./pages/showall";
import SearchPage from "./pages/searchPages";
import BookBorrowForm from "./pages/borrow";
import MyBooks from "./pages/mybooks";
import Profile from "./pages/users/profile";
import EditProfile from "./pages/users/edit-Profile";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/books/:id_book", element: <DetailPages /> },
  { path: "/books", element: <CategoryPages /> },
  { path: "/showall", element: <ShowAll /> },
  { path: "/search", element: <SearchPage /> },
  { path: "/borrow", element: <BookBorrowForm /> },
  { path: "/mybooks", element: <MyBooks /> },
  { path: "/myprofile", element: <Profile /> },
  { path: "/myprofile/edit", element: <EditProfile /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
