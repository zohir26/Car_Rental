import {
    createBrowserRouter,
  
  } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout></HomeLayout>,
    },
  ]);
  
  export default router;