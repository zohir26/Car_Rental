import {
    createBrowserRouter,
  
  } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UpdateUser from "../pages/Auth/UpdateUser";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
    },
    {
      path:'/login',
      element:<Login></Login>
    },
    {
      path:'/register',
      element:<Register></Register>
    },
    {
      path:'/updateUser',
      element:<UpdateUser></UpdateUser>
    },
    {
      path:"*",
      element:<ErrorPage></ErrorPage>
    }
  ]);
  
  export default router;