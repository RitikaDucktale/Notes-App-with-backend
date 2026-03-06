import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/mainLayout/MainLayout";
import Home from "../pages/home/Home";
import NotesPage from "../pages/notes/NotesPage";
import AuthLayout from "../layout/authLayout/AuthLayout";
import Signup from "../pages/signupPage/Signup";
import Login from "../pages/loginPage/Login";
import { ProtectedRoutes } from "./protectedRoutes";
import PublicRoutes from "./publicRoutes";

const Routes = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          { index: true, element: <Signup /> },
          { path: "login", element: <Login /> },
        ],
      },
    ],
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
       {
        path: "/notes",
        element: <MainLayout />,
        children: [
          {
      index:true,
      element: <NotesPage />,
    }
        ],
      },
    ],
  },
]);
export default Routes;
