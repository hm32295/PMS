import React, { useContext, useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  let{logout, loginData} = useContext(AuthContext);
  
  // تحديد إذا كانت الشاشة صغيرة
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(prev => !prev);
  };

  // إغلاق الـ sidebar عند الضغط على أي رابط في الشاشات الصغيرة
  const handleMenuClick = (navigationFn) => {
    if (isMobile) {
      setCollapsed(true);
    }
    navigationFn();
  };

  let navi=useNavigate();
 
  let funHome=()=>{
    navi('/dashboard')
  }
   let funUsers=()=>{
    navi('/dashboard/users')
  }
   let funPrjects=()=>{
    navi('/dashboard/project-List')
  }
   let funTasks=()=>{
    navi('/dashboard/tasks-list')
  }
   let funTasksBoard=()=>{
    navi('/dashboard/tasks-board')
  }
  
  return (
    <>
      {/* Overlay للشاشات الصغيرة */}
      {isMobile && !collapsed && (
        <div 
          className="sidebar-overlay active" 
          onClick={() => setCollapsed(true)}
        />
      )}
      
      <Sidebar
        className={`sidebar-root ${collapsed ? 'is-collapsed' : ''}`}
        collapsed={collapsed}
      >
        <div className="sidebar-header" onClick={toggleSidebar} style={{ cursor: 'pointer' }}>
          <h3> {collapsed ? <MdKeyboardDoubleArrowRight size={isMobile ? 40 : 50} /> : <MdKeyboardDoubleArrowLeft size={isMobile ? 40 : 50} />}</h3>   
        </div>

        <div className="mt-3">
          <Menu iconShape="circle" className={`sidebar-TopItems ${collapsed ? 'sidebar-TopItems-is-collapsed' : ''}`}>
            <MenuItem icon={<IoHome />} onClick={() => handleMenuClick(funHome)} className="menu-item-custom">Home</MenuItem>
            <MenuItem icon={<HiOutlineUsers />} onClick={() => handleMenuClick(funUsers)} className="menu-item-custom">Users</MenuItem>
            <MenuItem icon={<FiGrid />} className="menu-item-custom" onClick={() => handleMenuClick(funPrjects)}>Projects</MenuItem>
            {loginData?.userGroup === "Manager" &&
              <MenuItem icon={<FaTasks />} className="menu-item-custom" onClick={() => handleMenuClick(funTasks)}>Tasks</MenuItem>
            }
            {loginData?.userGroup !== "Manager" &&
              <MenuItem icon={<FaTasks />} className="menu-item-custom" onClick={() => handleMenuClick(funTasksBoard)}>Tasks</MenuItem>
            }
          </Menu>
          <div>
            <Menu iconShape="circle" >
              <MenuItem icon={<HiLogout />} onClick={() => handleMenuClick(() => {logout();navi("/")})} className="menu-item-custom">Logout</MenuItem>
            </Menu>
          </div>
        </div>
      </Sidebar>
    </>
  );
};

export default Sidepar;
