
import logo from '../../../../assets/image/logo.png'

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance, USERS_URLS } from '../../../../services/urls';

import { ClipLoader } from 'react-spinners';
import { EMAIL_VALIDION } from '../../../../services/validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type ForgetType = {
  email:"string",
  code: "string"
}
export default function VerifyAccount() {
  const [showPass, setShowPass] = useState(true);
  const [showPassCon, setShowPassCon] = useState(true);
  const navigate = useNavigate()
  let {register, formState:{errors}, handleSubmit, watch ,reset} =  useForm<ForgetType>();
  const [loder ,setLoder] = useState(false);


 


  const onSubmit = async (data:ForgetType)=>{
      setLoder(true)
      try{
        let response = await axiosInstance.put(USERS_URLS.VERIFY,data).then(res=>{
          toast.success(res.data.message);
          navigate("/login")
          setLoder(false);
          reset()
          
        })
      }catch(error:any){
        toast.success(error.data.message);
        setLoder(false);
    }

    
  }
  return (
    <div className='ResetPass VerifyAccount d-flex justify-content-center align-items-center row'>
      <div className="auth-container col-md-6 col-sm-8 d-flex justify-content-center align-items-center flex-column">
        <img className='w-50 mx-auto' src={logo} alt="" />
        <form onSubmit={handleSubmit(onSubmit)} className="box_ResetPass w-100 p-5 text-white rounded-2">
          <div className='titel'>
            <p className='m-0'>welcome to PMS</p>
            <h3 ><span className='position-relative text-capitalize'>R</span>eset  Password</h3>
          </div>


          <div className='d-flex justify-content-start align-items-start flex-column mt-3'>
            <label htmlFor="">E-mail</label>
            <input type="text" placeholder='Enter your E-mail'
                {...register("email",EMAIL_VALIDION )}
            />
            {errors.email&&<div className="text-danger mb-2">{errors.email.message}</div>}
          </div>

          
          <div className='d-flex justify-content-start align-items-start flex-column mt-3'>
            <label htmlFor="">OTP Verification</label>
            <input type="text" placeholder='Enter Verification'
               {...register("code",
                {
                  required:"code is required"
                }
                )}
            />
            {errors.code&&<div className="text-danger mb-2">{errors.code.message}</div>}
          </div>

        
          <button>{loder? <ClipLoader size={15} color='green' /> :"Save"}</button>
        </form>
      </div>
    </div>
  )
}
