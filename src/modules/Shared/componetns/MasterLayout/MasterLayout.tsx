import React from 'react'
import { Outlet } from 'react-router-dom'
import styles from './masterElement.module.css'
import Navrar from "../../componetns/Navbar/Navbar";
import SideBar from '../Sidebar/SideBar';




const MasterLayout = () => {
    const hideHeader =
    location.pathname === '/MasterElement/Add_Update_Resipe' ||
    location.pathname.startsWith('/MasterElement/Add_Update_Resipe/update/');


  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
       <SideBar/>
      </aside>
      <div className={styles.main}>
        <header className={styles.topnavbar}>
          <Navrar/>
        </header>
        <div className={styles.content} >
         
         {/* {!hideHeader && <Header />} */}
          <Outlet />
         
        </div>
      </div>
    </div>
  )
}

export default MasterLayout
