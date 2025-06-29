import  { useContext, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import './sidepar.css';
import { IoHome } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { FiGrid } from 'react-icons/fi';
import { HiLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import iconChange from "../../../../assets/image/iconChangePassword.svg"
import { AuthContext } from '../../../../context/AuthContext';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Sidepar = () => {
  const [collapsed, setCollapsed] = useState(true);
  let{logout, loginData}:{logout:any,loginData:any} = useContext(AuthContext);
  

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };
  let navigation=useNavigate();
 
  let funHome=()=>{
    navigation('/dashboard')
  }
   let funUsers=()=>{
    navigation('/dashboard/users')
  }
   let funProject=()=>{
    navigation('/dashboard/project-List')
  }
   let funTasks=()=>{
    navigation('/dashboard/tasks-list')
  }
   let funTasksBoard=()=>{
    navigation('/dashboard/tasks-board')
  }
   let funChangePassword=()=>{
    navigation('/change-password')
  }
  
  return (
    
    <Sidebar
      className={`sidebar-root ${collapsed ? 'is-collapsed' : ''}`}
      collapsed={collapsed}
    >
      <div className={`fixed position-fixed top-0 start-0 ${collapsed ? "w_Fixed_80" : "w_Fixed_250"}`}>

     
            <div className="sidebar-header" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
          <h3> {collapsed ? <MdKeyboardDoubleArrowRight size={50} /> : <MdKeyboardDoubleArrowLeft size={50} />}</h3>   
            </div>

          <div className="mt-3">
        <Menu iconShape="circle" className={`sidebar-TopItems ${collapsed ? 'sidebar-TopItems-is-collapsed' : ''}`}>
              <MenuItem icon={<IoHome />} onClick={funHome} className="menu-item-custom">Home</MenuItem>
              {loginData?.userGroup === "Manager" &&
                <MenuItem icon={<HiOutlineUsers />} onClick={funUsers} className="menu-item-custom">Users</MenuItem>
              }
              <MenuItem icon={<FiGrid />} className="menu-item-custom"  onClick={funProject}>Projects</MenuItem>
              {loginData?.userGroup === "Manager" &&
                <MenuItem icon={<FaTasks />} className="menu-item-custom" onClick={funTasks}>Tasks</MenuItem>
              }
              {loginData?.userGroup !== "Manager" &&
                <MenuItem icon={<FaTasks />} className="menu-item-custom" onClick={funTasksBoard}>Tasks</MenuItem>
              }
              <MenuItem icon={<HiLogout />} className="menu-item-custom text-capitalize" onClick={funChangePassword}>change Password</MenuItem>
            </Menu>
              <div>
              <Menu iconShape="circle" >
            
                <MenuItem icon={<HiLogout />}onClick={()=> {logout();navigation("/")}} className="menu-item-custom">Logout</MenuItem>
              </Menu>
            </div>
          </div>
          
     </div>
    </Sidebar>
  );
};

export default Sidepar;
