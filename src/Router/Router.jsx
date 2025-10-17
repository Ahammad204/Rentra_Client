import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../Home/Home/Home";
import Register from "@/Shared/Register/Register";
import Login from "@/Shared/Login/Login";

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
  },
]);