import { Navbar } from "./Navbar"
import Sidebar from "./Sidebar"


export const Dashboard = () => {
  return (
    <div className="flex gap-4">

    
    <Sidebar/>
    <Navbar/>
    </div>
  )
}
