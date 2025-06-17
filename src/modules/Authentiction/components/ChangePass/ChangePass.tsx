

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../../../assets/image/logo.png'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance, USERS_URLS } from '../../../../services/urls';
import { ClipLoader } from 'react-spinners';
import { EMAIL_VALIDION } from '../../../../services/validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
type ForgetType = {
  oldPassword: "string",
  newPassword: "string",
  confirmNewPassword: "string"
}
export default function ChangePass() {
  const [oldShowPass, setOldShowPass] = useState(true);
  const [showPass, setShowPass] = useState(true);
  const [showPassCon, setShowPassCon] = useState(true);
  const navigate = useNavigate()
  let {register, formState:{errors}, handleSubmit, watch ,reset} =  useForm<ForgetType>();
  const [loder ,setLoder] = useState(false);


  const onSubmit = async (data:ForgetType)=>{
      setLoder(true)
      try{
        let response = await axiosInstance(USERS_URLS.CHANGE_PASSWORD,data).then(res=>{
          toast.success(res.data.message);
          navigate("/login")
          setLoder(false);
          reset()
          
        })
      }catch(error){
        toast.success(error.data.message);
        setLoder(false);
    }
    
  }
  return (
    <div className='ResetPass ChangePass d-flex justify-content-center align-items-center row'>
      <div className="auth-container col-md-6 col-sm-8 d-flex justify-content-center align-items-center flex-column">
        <img className='w-50 mx-auto' src={logo} alt="" />
        <form onSubmit={handleSubmit(onSubmit)} className="box_ResetPass w-100 p-5 text-white rounded-2">
          <div className='titel'>
            <p className='m-0'>welcome to PMS</p>
            <h3 ><span className='position-relative text-capitalize'>C</span>hange Password</h3>
          </div>


          

          
          <div className='d-flex justify-content-start align-items-start flex-column mt-3'>
            <label htmlFor="">Old Password</label>
            <div className='input d-flex justify-content-between w-100'>
              <input  type={oldShowPass ? "password" : "text"} placeholder='Enter Old Password'
                   {...register("oldPassword",
                    {
                      required:"Old password is required"
                    }
                    )}
              />

                {oldShowPass?( <FontAwesomeIcon className='icons' icon={faEye} 
                            onClick={()=> setOldShowPass(false)}
                      /> ) :<FontAwesomeIcon className='icons' icon={faEyeSlash}
                            onClick={()=> setOldShowPass(true)}
                      
                /> }

            </div>
            {errors.oldPassword&&<div className="text-danger mb-2">{errors.oldPassword.message}</div>}
          </div>

          
          <div className='d-flex justify-content-start align-items-start flex-column mt-3'>
            <label htmlFor="">New Password</label>
            <div className='input d-flex justify-content-between w-100'>
              <input  type={showPass ? "password" : "text"} placeholder='Enter New Password'
                   {...register("newPassword",
                    {
                      required:"password is required"
                    }
                    )}
              />

                {showPass?( <FontAwesomeIcon className='icons' icon={faEye} 
                            onClick={()=> setShowPass(false)}
                      /> ) :<FontAwesomeIcon className='icons' icon={faEyeSlash}
                            onClick={()=> setShowPass(true)}
                      
                /> }

            </div>
            {errors.newPassword&&<div className="text-danger mb-2">{errors.newPassword.message}</div>}
          </div>
          <div className='d-flex justify-content-start align-items-start flex-column mt-3'>
            <label htmlFor="">Confirm Password</label>
            <div className='input d-flex justify-content-between w-100'>
              <input  type={showPassCon ? "password" : "text"} placeholder='Confirm New Password'
                   {...register("confirmNewPassword",
                    {
                      required:"Confirm Password is required",
                      validate: (value) => value === watch("newPassword") || "Passwords do not match"
                    }
                    )}
              />
                {showPassCon?( <FontAwesomeIcon className='icons' icon={faEye} 
                            onClick={()=> setShowPassCon(false)}
                      /> ) :<FontAwesomeIcon className='icons' icon={faEyeSlash}
                            onClick={()=> setShowPassCon(true)}
                      
                /> }

            </div>
            {errors.confirmNewPassword&&<div className="text-danger mb-2">{errors.confirmNewPassword.message}</div>}
          </div>
    
          <button>{loder? <ClipLoader size={15} color='green' /> :"Verify"}</button>
        </form>
      </div>
    </div>
  )
}
