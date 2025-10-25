import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Profile from "./profile";
import Feed from "./feed";
import Logout from "./logout";
const router=createBrowserRouter([
    {
        path:"/",
        element:<Home/>,
        children:[
            {
                path:"/",
                element:<Feed/>
            },
            {
                path:"/profile/:viewID",
                element:<Profile/>
            }
        ]

    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/logout",
        element:<Logout/>
    }
])

export default function Body(){
    return(
        <div>
            <RouterProvider router={router}/>
        </div>
    )
}