import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './masterElement.css';
import SideBar from '../Sidebar/SideBar';
import Header from '../Header/Header';
import { Nav, Navbar } from 'react-bootstrap';
import Top_Navbar from '../Navbar/Top_Navbar';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const checkScreenSize = () => {
      const isSmall = window.innerWidth < 990;
      setIsSmallScreen(isSmall);
      if (isSmall) setSidebarOpen(false);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="layout-container">
      {isSmallScreen && (
        <button onClick={toggleSidebar} className="sidebar-toggle-btn">
          {/* icon */}
        </button>
      )}
      {isSmallScreen && sidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      <SideBar open={sidebarOpen} onToggle={toggleSidebar} isSmallScreen={isSmallScreen} />

      <div className={`main-content ${!isSmallScreen && sidebarOpen ? 'with-sidebar' : ''}`}>
       
        <header className="topnavbar">
          <Top_Navbar onToggleSidebar={toggleSidebar} />
        </header>

       
        <div className="page-content">
         
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
