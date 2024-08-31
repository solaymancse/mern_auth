import { SidebarData } from "../../components/sidebarData/SidebarData";
import logo from "../../assets/logo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { bool, func } from "prop-types";
import { useSelector } from "react-redux";
import { selectTheme } from "../../features/theme/themeSlice";
import { MdOutlineLogout } from "react-icons/md";

const Sidebar = ({ isClicked, onClose }) => {
  const location = useLocation();
  const { themeColor, isDarkMode } = useSelector(selectTheme);
  const navigate = useNavigate();

  const locationHandler = (path) => {
    return location.pathname === path ? `${isDarkMode ? "border bg-dark" : themeColor} text-[#F3F6FD]` : "";
  };

 
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  // Retrieve user from localStorage and parse role
  const role = localStorage.getItem('role');

  return (
    <div className="w-full">
      <div className="w-full h-[80px] items-center flex justify-center">
        <img className={`${isClicked ? "w-[80px] h-[40px]" : "w-[120px] h-full"}`} src={logo} alt="logo" />
      </div>

      <div className="mt-4">
        {/* Sidebar content */}
        {SidebarData.filter(item => item.roles.includes(role)).map((item, index) => (
          <div className="sidebar" key={index}>
            <Link
              onClick={onClose}
              to={item.path}
              className={`flex justify-start text-start items-center rounded-lg ${locationHandler(item.path)} hover:bg-blue-100 dark:hover:bg-dark dark:hover:border`}
            >
              <div className="w-[50px] h-[45px] rounded-full flex items-center justify-center">
                {item.icon}
              </div>
              {!isClicked && <div className="flex text-sm justify-start text-start">{item.title}</div>}
            </Link>
          </div>
        ))}

        <div onClick={handleLogout} className="sidebar px-4 py-2 flex items-center gap-4 mt-4 cursor-pointer">
          <MdOutlineLogout />
          <p className="text-sm">Logout</p>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isClicked: bool,
  onClose: func,
};

export default Sidebar;
