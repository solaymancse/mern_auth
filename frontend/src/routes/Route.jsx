import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import { Dashboard } from "../pages/dashboard/Dashboard";

export const route = createBrowserRouter([
    {
        path: '/',
        element: <Login/>
    },
    {
        path: '/dashboard',
        element: <Dashboard/>
    }
])
