import {
  createBrowserRouter,

} from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import UpdateUser from "../pages/Auth/UpdateUser";
import PrivateRoute from "./PrivateRoute";

import MyBookings from "../pages/car/MyBookings";
import MyCars from "../pages/car/Mycars";
import AddCar from "../pages/car/AddCar";
import AvailableCars from "../pages/car/AvailableCars";
import ViewDetails from "../pages/car/ViewDetails";
import UpdateCarInfo from "../pages/car/UpdateCarInfo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/register',
    element: <Register></Register>
  },
  {
    path: '/updateUser',
    element: <PrivateRoute>
      <UpdateUser></UpdateUser>
    </PrivateRoute>
  },
  {
    path: '/addCar',
    element: <PrivateRoute>
       <AddCar></AddCar>
    </PrivateRoute>
  },
  {
    path: '/availableCar',
    element: 
       <AvailableCars></AvailableCars>
   
  },
  {
    path: `/viewDetails/:id`,
    element: <PrivateRoute>
      <ViewDetails></ViewDetails>
    </PrivateRoute>
  },
  {
    path: '/myCars',
    element: <PrivateRoute>
      <MyCars></MyCars>
    </PrivateRoute>
  },
  {
    path:'/updateCarInfo/:id',
    element:<PrivateRoute>
      <UpdateCarInfo></UpdateCarInfo>
    </PrivateRoute>
  },
  {
    path: '/myBookings',
    element: <PrivateRoute>
      <MyBookings></MyBookings>
    </PrivateRoute>
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>
  }
]);

export default router;