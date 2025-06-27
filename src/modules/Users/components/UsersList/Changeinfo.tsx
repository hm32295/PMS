import React, { useContext, useState, useCallback } from 'react'

import { useDropzone } from 'react-dropzone'
import { Trash2 } from 'lucide-react'
import { AuthContext } from '../../../../context/AuthContext'
import img_profile  from '../../../Shared/componetns/Navbar/image (2).jpg'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { axiosInstance } from '../../../../services/urls'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { EMAIL_VALIDION } from '../../../../services/validation'
const Changeinfo = () => {
    const token = localStorage.getItem('token');
    let navigate=useNavigate()
  const { Userdata,funUserdata } = useContext(AuthContext)
   const avatar = Userdata?.imagePath;
  let UrlAvatar='https://upskilling-egypt.com:3003/'
  const [file, setFile] = useState<File & { preview?: string } | null>(null)
  const onDrop = useCallback((accepted: File[]) => {
    const selectedFile = accepted[0];
    if (selectedFile) {
     
      if (!selectedFile.type.startsWith('image/')) {
        toast.error('Please select an image file.');
        return;
      }

     
      if (selectedFile.size > 2 * 1024 * 1024) {
        toast.error('Image size exceeds 2MB.');
        return;
      }

      const img = Object.assign(selectedFile, {
        preview: URL.createObjectURL(selectedFile),
      })
      setFile(img)
    }
  }, [])
  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: { 'image/*': [] },
  })
  const removeImage = () => setFile(null)
let {register,handleSubmit,formState:{errors}}=useForm()
let handledata=(data:any)=>{
    let appending= new FormData()
    appending.append('userName',data.userName)
     appending.append('email',data.email)
      appending.append('country',data.country)
       appending.append('phoneNumber',data.phoneNumber)
        appending.append('profileImage', file || '')
  appending.append('confirmPassword',data.confirmPassword)
  return appending;
        

}
let funEdit_Profile= async(data:any)=>{
    let resuluation=handledata(data)
    console.log(data)
    try {
        let res=await axios.put('https://upskilling-egypt.com:3003/api/v1/Users/',resuluation,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      toast.success('Saved Success !', {
  theme: 'light',      
  position: 'top-right',
  autoClose: 3000
});
funUserdata()
         setTimeout(() => {
             funUserdata()
  navigate("/dashboard/Protifolio");
}, 2000);

    } catch (error) {
    toast.error(' make sure your password is correct.')
        
    }
}
  return (
    <div className="safa7a_profile_ya3taa">
         <ToastContainer
  style={{ zIndex: 9999 }}
  position="top-right"
/>

      <div className="container_profile_kol_7aga">
        <div className="card_profile_ra2eesy">
     

         <form onSubmit={handleSubmit(funEdit_Profile)}  className="section_bayanat_profile">
                 <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
     <div
  {...getRootProps()}
  onClick={() => !file && open()}
  style={{
    width: 150,
    height: 150,
    border: '2px dashed #aaa',
    borderRadius: 100,
    position: 'relative',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: file ? `url(${file.preview})` : 'none',
    cursor: 'pointer',
  }}
>
   <input {...getInputProps()} />

   {!file ? (
     <img
       src={`${UrlAvatar}${avatar}` || img_profile}
       alt=""
       className='image_Profile_Change'
       onClick={() => open()}
       style={{ cursor: 'pointer' }}
     />
   ) : (
     <Trash2
       size={20}
       style={{
         position: 'absolute',
         top: 6,
         right: 6,
         background: 'rgba(255,255,255,0.8)',
         borderRadius: '50%',
         padding: 4
       }}
       onClick={e => { e.stopPropagation(); removeImage() }}
     />
   )}
</div>

          </div>
      <div className="saff_inputs_profile">
        <div className="group_input_profile">
          <label className="label_input_profile">User Name</label>
          <input
            type="text"
            defaultValue={Userdata?.userName}
            className="input_Name_Profile_Ya3taa"
          
                  {...register("userName",{required: "the user name is reqired"})}
          />
                {errors.userName&&<div className="text-danger mb-2">{errors.userName.message}</div>}

        </div>
        <div className="group_input_profile">
          <label className="label_input_profile">Email</label>
          <input
            type="email"
            defaultValue={Userdata?.email}
            className="input_Email_Profile_Ya3taa"
                            {...register("email",EMAIL_VALIDION)}
            
          />
            {errors.email&&<div className="text-danger mb-2">{errors.email.message}</div>}
        </div>
      </div>

      <div className="saff_inputs_profile">
        <div className="group_input_profile">
          <label className="label_input_profile">Country</label>
          <input
            type="text"
            defaultValue={Userdata?.country}
            {...register("country",{required: "the country is reqired"})}
            className="input_Country_Profile_Ya3taa"
          />
        {errors.country&&<div className="text-danger mb-2">{errors.country.message}</div>}

        </div>
        <div className="group_input_profile">
          <label className="label_input_profile">Phone Number</label>
          <input
            type="tel"
            defaultValue={Userdata?.phoneNumber}
            className="input_Phone_Profile_Ya3taa"
              {...register("phoneNumber",{required: "the phoneNumber is reqired"})}
          />
            {errors.phoneNumber&&<div className="text-danger mb-2">{errors.phoneNumber.message}</div>}

        </div>
      </div>

      <div className="saff_inputs_profile d-block m-auto w-100">
        <div className="group_input_profile">
          <label className="label_input_profile">Confirm password</label>
          <input
            type="password"
            defaultValue={
              Userdata?.isActivated ? 'is Active' : 'None Active'
            }
              {...register("confirmPassword",
                        {
                          required:"Confirm Password is required"
                        }
                        )}
            className="input_Activation_Profile_Ya3taa"
          />
        {errors.confirmPassword&&<div className="text-danger mb-2">{errors.confirmPassword.message}</div>}

        </div>
      </div>

      <div className="section_button_profile">
        <button type="submit" className="button_Account_Info_Ya3taa">
          Save Changes
        </button>
      </div>
    </form>

        </div>
      </div>
    </div>
  )
}

export default Changeinfo
