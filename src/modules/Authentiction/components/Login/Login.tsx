
import  { useContext, useEffect, useState } from 'react';
import './login.css';
import bgYacts from '../../../../images/Logo.png'
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import { axiosInstance, USERS_URLS } from '../../../../services/urls';
import { EMAIL_VALIDION } from '../../../../services/validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { ClipLoader } from 'react-spinners';
const Login = () => {
  const [Loader ,setLoader] = useState(false);
  let navigation=useNavigate();
   const [showPass, setShowPass] = useState(true);

  const {register,handleSubmit,formState:{errors}}=useForm();
  let{saveLoginData,funUserdata,funGetStatus_info,funGetStatus_Users,loginData} :{loginData:any,saveLoginData:any,funUserdata:any,funGetStatus_info:any,funGetStatus_Users:any}= useContext(AuthContext);

  let submittion= async(data:any)=>{
    setLoader(true)
    try {
      let res= await axiosInstance.post(USERS_URLS.LOGIN,data)
      localStorage.setItem('token' , (res.data.token));
      console.log(loginData);
      
        toast.success('Welcome');
        navigation('/dashboard');
        saveLoginData()
        funUserdata()
        funGetStatus_info()
        funGetStatus_Users()
        
    } catch (error) {
      console.error("Error during form submission:", error);
       toast.error("Error during form submission:");
    }
    finally{
      setLoader(false)
    }
   
  }
 
  useEffect(() => {
    funGetStatus_info()
    funGetStatus_Users()
},[]);

 
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
               {...register("email", EMAIL_VALIDION)}
            />
            {errors?.email && <span className="ErrorYastaPassemail">{errors?.email.message}</span>}
          </div>

          <div className="FieldYasta">
            <label className="LabelYasta">Password</label>
            <div className="PasswordWrapperYasta">
              <div className='d-flex justify-content-between align-items-center text-white'>
                  <input 
                  type={showPass ? "password" : "text"}   
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
                  {showPass?( <FontAwesomeIcon className='icons' icon={faEye} 
                                onClick={()=> setShowPass(false)}
                          /> ) :<FontAwesomeIcon className='icons' icon={faEyeSlash}
                                onClick={()=> setShowPass(true)}
                          
                    /> }
              </div>
              {errors.password && <span className="ErrorYastaPassemail">{errors.password.message}</span>}
            
            </div>
          </div>

          <div className="LinksYasta">
            <Link to={"/register"} className="LinkYasta">Register Now ?</Link>
            <Link to={'/forget-pass'}  className="LinkYasta">Forget Password ?</Link>
          </div>

          <button type="submit" className="ButtonYasta">
          {Loader?  <ClipLoader size={15} color='green' /> :"Login"}
            
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
