import { Link, useNavigate } from "react-router-dom";
import './ProjectData.css'
import { useForm } from "react-hook-form";
import { axiosInstance, PROJECTS_URLS } from "../../../../services/urls";
import { useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";


export default function ProjectData() {
  const navigate = useNavigate();
  const {handleSubmit, register,formState:{errors} ,reset}= useForm();
  const [loder , setLoder] = useState(false)
  const saveData =async (data)=>{
      setLoder(true)
    try {
      
      const respnse = await axiosInstance.post(PROJECTS_URLS.CRETE,data);
      console.log(respnse);
      setLoder(false);
      toast.success(respnse.statusText + ' success' || "Created Succes");
      reset()
      
    } catch (error) {
      setLoder(false)
      
    }
    
  }
  return (
    <div className='ProjectData'>
      <header >
        <button onClick={()=>{navigate('/dashboard/Project-List')}}>View All Projects</button>
        <h2>Add a New Project</h2>
      </header>
      <form action="" onSubmit={handleSubmit(saveData)}>
        <div className="title">
          <label> title</label>
          <input type="text" placeholder="Name" {...register("title",{required: "faid is required"} )}/>
          {errors?.title&&<div className="text-danger mb-2">{errors?.title?.message}</div>}
        </div>
        <div className="discripton">
          <label htmlFor="">Description</label>
          <textarea placeholder="Description" {...register("description",{required: "faid is required"} )}></textarea>
          {errors?.description&&<div className="text-danger mb-2">{errors?.description?.message}</div>}
        </div>
        <div className="buttons">
          <button type="submit">
            {loder ? <ClipLoader color="#000" size={20} /> : 'Save' }
            
          </button>
          <Link to="/dashboard/Project-List">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
