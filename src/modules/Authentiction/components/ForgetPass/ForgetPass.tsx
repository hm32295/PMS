import bgYacts from '../../../../images/Logo.png'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function ForgetPass() {
   let {register,handleSubmit,formState:{errors}}=useForm()
  let submittion= async(data:any)=>{
         
    try {
    let res= await axios.post('https://upskilling-egypt.com:3003/api/v1/Users/Reset/Request',data, { headers: { 'Content-Type': 'application/json' } } )
    toast.success('OTP sent. Please check your inbox.', {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  style: {
    background: 'rgba(239, 155, 40, 1)',
    color: '#000',
    fontWeight:600,
    fontSize:'15px',
  },
  onClose: () => {
    navi('/reset-pass'); 
  }
});
    } catch (error) {
      console.error("Error during form submission:", error);
       toast.error(error?.response?.data?.message  || "Something went wrong", {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  style: {
    background: 'rgba(239, 155, 40, 1)',
    color: '#000',
    fontWeight:600,
    fontSize:'15px',
  },
 
});
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
          <h3 className="LoginTitleYasta">Forget Password</h3>
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

        

         

          <button type="submit" className="ButtonYasta p-2 mt-2">
            Verify
          </button>
        </form>
      </div>
    </div>
  )
}
