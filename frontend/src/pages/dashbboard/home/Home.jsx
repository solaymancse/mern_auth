import EmployeeSalary from "../../../components/EmployeeSalary/EmployeeSalary"
import HomeBox from "../../../components/homeBox/HomeBox"
import Revenue from "../../../components/revenue/Revenue"
import { HomeBoxData } from "../../../Data"


const Home = () => {
  return (
    <div className="w-full">
      <HomeBox data={HomeBoxData} grid="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6" />
      <Revenue />
      <EmployeeSalary />

    </div>
  )
}

export default Home
