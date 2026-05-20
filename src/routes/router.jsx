import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ExploreCars from "../pages/ExploreCars";
import CarDetails from "../pages/CarDetails";
import AddCar from "../pages/AddCar";
import MyAddedCars from "../pages/MyAddedCars";
import MyBookings from "../pages/MyBookings";
import NotFound from "../pages/NotFound";
import UpdateCar from "../pages/UpdateCar"; // এটি তৈরি করে কোড দিয়েছি আগে
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/cars", element: <ExploreCars /> },
      { path: "/car/:id", element: <CarDetails /> },
      { path: "/add-car", element: <PrivateRoute><AddCar /></PrivateRoute> },
      { path: "/my-added-cars", element: <PrivateRoute><MyAddedCars /></PrivateRoute> },
      { path: "/my-bookings", element: <PrivateRoute><MyBookings /></PrivateRoute> },
      { path: "/update-car/:id", element: <PrivateRoute><UpdateCar /></PrivateRoute> },
    ],
  },
  { path: "*", element: <NotFound /> },
]);

export default router;