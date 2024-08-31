import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "../components/privateRoute/PrivateRoute";
import Dashboard from "../pages/dashbboard/Dashboard";
import Home from "../pages/dashbboard/home/Home";
import Categories from "../components/categories/Categories";
import Chat from "../pages/dashbboard/Chat/Chat";
import Pricing from "../pages/dashbboard/pricing/Pricing";
import Index from "../components/role/Index";
import UserIndex from "../components/user/UserIndex";
import Setting from "../pages/setting/Setting";
import Tables from "../pages/table/Tables";
import ProfilePage from "../pages/profile/ProfilePage";

export const route = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/dashboard',
        element: (
            < PrivateRoute >
                <Dashboard />
            </ PrivateRoute>
        ),
        children: [
            {
                path: "/dashboard",
                element: <Home />
            },
            {
                path: "/dashboard/categories",
                element: <Categories />

            },
            {
                path: "/dashboard/chat",
                element: <Chat />
            },
            {
                path: "/dashboard/pricing",
                element: <Pricing />
            },
            {
                path: "/dashboard/role",
                element: <Index />
            },
            {
                path: "/dashboard/users",
                element: <UserIndex />
            },
            {
                path: "/dashboard/settings",
                element: <Setting />
            },
            {
                path: "/dashboard/table",
                element: <Tables />
            },
            {
                path: "/dashboard/profile",
                element: <ProfilePage />
            },

        ]

    }
])
