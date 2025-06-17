<<<<<<< HEAD
import React, { useEffect } from 'react';
import './login.css';
import bgYacts from '../../../../images/Logo.png'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
=======

>>>>>>> eeb244e0cc8b3a869dff5c4a92a96b9264a00981


const Login = () => {
  let {register,handleSubmit,formState:{errors}}=useForm()
  let submittion= async(data:any)=>{
    try {
      let res= await axios.post('https://upskilling-egypt.com:3003/api/v1/Users/Login',data, { headers: { 'Content-Type': 'application/json' } } )
 
  toast.success('تم حفظ البيانات بنجاح!');
 
    navi('/dashboard/Project-List');

 


      
      

    } catch (error) {
      console.error("Error during form submission:", error);
      
    }
   
  }
  let navi=useNavigate()
 
  return (
    <div className="ContainerYasta">
       <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
      <div className="BoxLoginYasta">
        <div className="HeaderYasta">
          <img src={bgYacts} alt="PMS Logo" className="LogoYasta" />
        </div>
        
        <div className="WelcomeYasta">
          <h2 className="WelcomeTitleYasta">Welcome to PMS</h2>
          <h3 className="LoginTitleYasta">Login</h3>
        </div>

        <form onSubmit={handleSubmit(submittion)} className="FormYasta">
          <div className="FieldYasta ">
            <label className="LabelYasta">E-mail</label>
            <input 
              type="email" 
              className="InputYasta " 
                autoComplete="off"

              placeholder="Enter your E-mail"
               {...register("email", {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Invalid email format"
    }
  })}
            />
            {errors.email && <span className="ErrorYastaPassemail">{errors.email.message}</span>}
          </div>

          <div className="FieldYasta">
            <label className="LabelYasta">Password</label>
            <div className="PasswordWrapperYasta">
              <input 
               type="password"   
                className="InputYasta" 
                placeholder="Enter your password"
                 autoComplete="off"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />
              {errors.password && <span className="ErrorYastaPassemail">{errors.password.message}</span>}
            
            </div>
          </div>

          <div className="LinksYasta">
            <a href="#" className="LinkYasta">Register Now ?</a>
            <a href="#" className="LinkYasta">Forget Password ?</a>
          </div>

          <button type="submit" className="ButtonYasta">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
