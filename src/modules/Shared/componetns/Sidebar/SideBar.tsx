import React, { useContext, useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import './sidepar.css';
import { IoHome } from 'react-icons/io5';
import { HiOutlineUsers } from 'react-icons/hi2';
import { FiGrid } from 'react-icons/fi';
import { LuCalendarSync } from 'react-icons/lu';
import { FaUnlockAlt } from 'react-icons/fa';
import { HiLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import { LogOut } from 'react-feather';
import { AuthContext } from '../../../../context/AuthContext';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const Sidepar = () => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };
  let navi=useNavigate();
 
  let funHome=()=>{
    navi('/dashboard')
  }
   let funUsers=()=>{
    navi('/dashboard/Users')
  }
   let funPrjects=()=>{
    navi('/dashboard/Project-List')
  }
   let funTasks=()=>{
    navi('/dashboard/Tasks')
  }
   let{logout} = useContext(AuthContext);
   
  return (
    
    <Sidebar
      className={`sidebar-root ${collapsed ? 'is-collapsed' : ''}`}
      collapsed={collapsed}
    >
      <div className="sidebar-header" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
    <h3> {collapsed ? <MdKeyboardDoubleArrowRight size={50} /> : <MdKeyboardDoubleArrowLeft size={50} />}</h3>   
      </div>

     <div className="mt-3">
  <Menu iconShape="circle" className={`sidebar-TopItems ${collapsed ? 'sidebar-TopItems-is-collapsed' : ''}`}>
        <MenuItem icon={<IoHome />} onClick={funHome} className="menu-item-custom">Home</MenuItem>
        <MenuItem icon={<HiOutlineUsers />} onClick={funUsers} className="menu-item-custom">Users</MenuItem>
        <MenuItem icon={<FiGrid />} className="menu-item-custom"  onClick={funPrjects}>Projects</MenuItem>
        <MenuItem icon={<FaTasks />} className="menu-item-custom" onClick={funTasks}>Tasks</MenuItem>
      </Menu>
         <div>
        <Menu iconShape="circle" >
       
          <MenuItem icon={<HiLogout />}onClick={()=> {logout();navi("/")}} className="menu-item-custom">Logout</MenuItem>
        </Menu>
      </div>
     </div>
    
   
    </Sidebar>
  );
};

export default Sidepar;
