

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logo from '../../../../assets/image/logo.png'
import avtar from '../../../../assets/image/logo.png'
import "./Regestor.css"
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { axiosInstance, USERS_URLS } from '../../../../services/urls';

import { ClipLoader } from 'react-spinners';
import { EMAIL_VALIDION } from '../../../../services/validation';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

type ForgetType = {
  userName:string ,
  email:string ,
  country:string,
  phoneNumber:string,
  password:string ,
  confirmPassword:string,
  profileImage:any
 
}
export default function Regestor() {
  const [showPass, setShowPass] = useState(true);
  const [showPassCon, setShowPassCon] = useState(true);
  const navigate = useNavigate()
  let {register, formState:{errors}, handleSubmit, watch ,reset} =  useForm<ForgetType>();
  const [loder ,setLoder] = useState(false);

  let handelDataToForm = (data:ForgetType) =>{
  
    let recipesForm = new FormData();
    recipesForm.append('userName', data.userName)
    recipesForm.append('email', data.email)
    recipesForm.append('country', data.country)
    recipesForm.append('confirmPassword', data.confirmPassword)
    recipesForm.append('password', data.password)
    recipesForm.append('phoneNumber', data.phoneNumber)
    recipesForm.append('profileImage', data.profileImage[0])
   
    return recipesForm
  
  }


  const onSubmit = async (data:ForgetType)=>{
    let resulteHandleForm =handelDataToForm(data)
 
    
      setLoder(true)
      try{
        let response = await axiosInstance.post(USERS_URLS.REGISTER,resulteHandleForm).then(res=>{
          toast.success(res.data.message);
          navigate("/verify-account")
          setLoder(false);
          reset()
          
        })
      }catch(error){
        console.log(error);
        
        toast.success(error.response.data.message);
        setLoder(false);
    }

    
  }
  return (
    <div className='ResetPass Regestor d-flex justify-content-center align-items-center row'>
      <div className="auth-container col-md-8 col-sm-10 d-flex justify-content-center align-items-center flex-column">
        <img className='w-50 mx-auto' src={logo} alt="" />
        
        <form onSubmit={handleSubmit(onSubmit)} className="box_ResetPass w-100 p-5 text-white rounded-2 row">
          <div className='titel'>
            <p className='m-0'>welcome to PMS</p>
            <h3 ><span className='position-relative text-capitalize'>C</span>reate New Account</h3>
          </div>

          <div className="div_avtar w-100 d-flex justify-content-center align-items-center overflow-hidden">
              <img src={avtar} className='avtar rounded-circle' alt="" />
          </div>


          <div className='sup_input row w-100 gap-2 justify-content-between'>

            <div className='d-flex col-sm-8 p-0 justify-content-start align-items-start flex-column mt-3'>
              <label htmlFor="">User Name</label>
              <input type="text" placeholder='Enter your E-mail'
                  {...register("userName",{required: "the user name is reqired"})}
              />
              {errors.userName&&<div className="text-danger mb-2">{errors.userName.message}</div>}
            </div>

            
            <div className='d-flex col-sm-8  p-0 justify-content-start align-items-start flex-column mt-3'>
              <label htmlFor="">E-mail</label>
              <input type="text" placeholder='Enter your E-mail'
                {...register("email",EMAIL_VALIDION)}
              />
              {errors.email&&<div className="text-danger mb-2">{errors.email.message}</div>}
            </div>
          </div>

          <div className='sup_input row w-100 gap-2 justify-content-between'>

            <div className='d-flex col-sm-8 p-0 justify-content-start align-items-start flex-column mt-3'>
              <label htmlFor="">Country</label>
              <input type="text" placeholder='Enter your country'
                  {...register("country",{required: "the country is reqired"})}
              />
              {errors.country&&<div className="text-danger mb-2">{errors.country.message}</div>}
            </div>

            
            <div className='d-flex col-sm-8 p-0 justify-content-start align-items-start flex-column mt-3'>
              <label htmlFor="">Phone Number</label>
              <input type="text" placeholder='Enter your phone number'
                  {...register("phoneNumber",{required: "the phoneNumber is reqired"})}
              />
              {errors.phoneNumber&&<div className="text-danger mb-2">{errors.phoneNumber.message}</div>}
            </div>

            
            
          </div>

          <div className='sup_input row w-100 gap-2 justify-content-between'>


              <div className='d-flex col-sm-8 p-0 justify-content-start align-items-start flex-column mt-3'>
                <label htmlFor="">Password</label>
                <div className='input d-flex justify-content-between w-100'>
                  <input  type={showPass ? "password" : "text"} placeholder='Enter Password'
                      {...register("password",
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
                {errors.password&&<div className="text-danger mb-2">{errors.password.message}</div>}
              </div>

              <div className='d-flex col-sm-8 p-0 justify-content-start align-items-start flex-column mt-3'>
                <label htmlFor="">Confirm Password</label>
                <div className='input d-flex justify-content-between w-100'>
                  <input  type={showPassCon ? "password" : "text"} placeholder='Confirm New Password'
                      {...register("confirmPassword",
                        {
                          required:"Confirm Password is required",
                          validate: (value) => value === watch("password") || "Passwords do not match"
                        }
                        )}
                  />
                    {showPassCon?( <FontAwesomeIcon className='icons' icon={faEye} 
                                onClick={()=> setShowPassCon(false)}
                          /> ) :<FontAwesomeIcon className='icons' icon={faEyeSlash}
                                onClick={()=> setShowPassCon(true)}
                          
                    /> }

                </div>
                {errors.confirmPassword&&<div className="text-danger mb-2">{errors.confirmPassword.message}</div>}
              </div>

          </div>


          <div className='sup_input row w-100 mt-3  justify-content-center'>

              <div className='input d-flex justify-content-center w-50'>
                    <input className=''  type="file" placeholder='change your image'
                        {...register("profileImage" )}
                    />
                </div>
                {errors.profileImage&&<div className="text-danger mb-2">{errors.profileImage.message}</div>}
          </div>

         
    
          <button className='w-50 m-auto mt-4'>{loder?  <ClipLoader size={15} color='green' /> :"save"}</button>
        </form>
      </div>
    </div>
  )
}
