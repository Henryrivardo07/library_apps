import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
import Dashboard from "./pages/dasboard/dashboard";
import ProtectedRoute from "./routes/protech-route";
import EditBorrow from "./pages/edit-borrow/editBorrow";
import ManageBook from "./pages/manageBook/manageBook";
import EditBook from "./pages/manageBook/editBook";
import AddNewBook from "./pages/manageBook/addNewBook";

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
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
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/editBorrow/:id", element: <EditBorrow /> },
      { path: "/managebook", element: <ManageBook /> },
      { path: "/editbook/:id", element: <EditBook /> },
      { path: "/newbook", element: <AddNewBook /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
