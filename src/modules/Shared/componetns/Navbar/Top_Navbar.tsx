import React, { useContext, useEffect } from 'react';
import { BsBell } from 'react-icons/bs';
import './nav.css'; // لا تغيّر في هذا الملف إذا كانت الكلاسات المخصصة معرفة فيه
import img_profile  from './imgProfile.svg'
import { IoIosArrowDown } from "react-icons/io";
import { AuthContext } from '../../../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = () => {
  useEffect(()=>{
   funUserdata()
},[])
    const auth = useContext(AuthContext);
     const { loginData,Userdata,funUserdata} =auth ;
      const name = Userdata?.userName;   
  const email = Userdata?.email; 
  const avatar = Userdata?.imagePath;
  let UrlAvatar='https://upskilling-egypt.com:3003/'

  let navigate=useNavigate()
  let FunProtifolio=()=>{
    navigate('/dashboard/Protifolio')
  }

  return (
    <nav className="Nav_Ya3a3pee">
      <div className="w-100 px-4">
        <div className="d-flex align-items-center justify-content-between">
        
          <div className="flex-shrink-0">
            <Link  to="/dashboard" className="Logo_Ya_Ged3an d-flex align-items-center text-decoration-none">
              <div className="Logo_Soora me-2">
                PM
              </div>
              <span className=" d-md-inline">PMS</span>
            </Link>
          </div>
          {/* User Info Section */}
          <div className="flex-shrink-0">
            <div className="User_Info_Ya_Bro d-flex align-items-center">
                         <div className="Notification_Icon_Ya_Basha ">
                 <BsBell />
              </div>
              <div className="User_Details_Ya_Habibi me-3  text-end">
                <div className="imageE m-1">
                                <img 
                                onClick={FunProtifolio}
                src={`${UrlAvatar}${avatar}`||img_profile}
                alt="UserdataimagePath" 
                className="User_Soora_Ya_King rounded-circle"
                style={{ width: '45px', height: '45px', objectFit: 'cover' }}
              />
                </div>
                <div className="Infoo">
                  <div className="ProfileName">
                      <p className="User_Ism mb-0 ">{name}</p>
                   <IoIosArrowDown className='IoIosArrowDown' />
                  </div>
                <p className="User_Email mb-0">{email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
