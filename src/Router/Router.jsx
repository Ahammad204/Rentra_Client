import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home/Home";
import Register from "@/Shared/Register/Register";
import Login from "@/Shared/Login/Login";
import Dashboard from "@/Dashboard/Dashboard/Dashboard";
import UserProfile from "@/Dashboard/UserProfile/UserProfile";
import PrivateRoute from "./PrivateRoute";
import CreateService from "@/Dashboard/CreateService/CreateService";
import CreateServiceRequest from "@/Dashboard/CreateServiceRequest/CreateServiceRequest";
import CreateRentPost from "@/Dashboard/CreateRentPost/CreateRentPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        },{
          path:"/register",
          element:<Register></Register>
        },{
          path:"/login",
          element: <Login></Login>
        }
    ]
  },{
    path:"/dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      {
        path:"/dashboard",
        element:<PrivateRoute><UserProfile></UserProfile></PrivateRoute>
      },{
        path:"/dashboard/createTask",
        element: <PrivateRoute><CreateService></CreateService></PrivateRoute>
      },{
        path:"/dashboard/serviceRequest",
        element: <PrivateRoute><CreateServiceRequest></CreateServiceRequest></PrivateRoute>
      },{
        path:"/dashboard/rentPost",
        element: <PrivateRoute><CreateRentPost></CreateRentPost></PrivateRoute>
      }
    ]
  }
]);