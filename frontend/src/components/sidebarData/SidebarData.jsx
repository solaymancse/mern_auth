import { CgProfile } from "react-icons/cg";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { IoBarChartSharp } from "react-icons/io5";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { TiTicket } from "react-icons/ti";


export const SidebarData = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: <RiDashboardHorizontalFill />,
        roles: ["admin", "user", "super admin","manager"], 
    },
    {
        title: "Create Role",
        path: "/dashboard/role",
        icon: <CgProfile />,
        roles: ["super admin"], 
    },
    {
        title: "Create User",
        path: "/dashboard/users",
        icon: <CgProfile />,
        roles: ["admin", "super admin","manager"], 
    },
    {
        title: "Sell",
        path: "/dashboard/tickets",
        icon: <TiTicket />,
        roles: ["super admin","user","manager","admin"], 
    },
    {
        title: "Products",
        path: "/dashboard/chat",
        icon: <HiOutlineCurrencyDollar />,
        roles: ["super admin","user","manager","admin"],
    },
    {
        title: "Purchase",
        path: "/dashboard/form",
        icon: <IoBarChartSharp />,
        roles: ["super admin","manager","admin"], 
    },
    {
        title: "Table",
        path: "/dashboard/table",
        icon: <IoBarChartSharp />,
        roles: ["super admin","manager","admin"],
    },
    {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <IoMdSettings />,
        roles: ["super admin","admin"],
    },
    {
        title: "Profile",
        path: "/dashboard/profile",
        icon: <CgProfile />,
        roles: ["super admin","user","manager","admin"], // visible to all roles
    },
]
