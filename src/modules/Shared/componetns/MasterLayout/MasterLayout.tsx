import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import SideBar from '../Sidebar/SideBar'
import './master.css'
export default function MasterLayout() {
  return (
    <div>
        <Navbar />
        <div className="Flexation ">
            <Outlet />
            <SideBar/>
        </div>
        
    </div>
  )
}
