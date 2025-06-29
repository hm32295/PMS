import { Link, useLocation, useNavigate } from "react-router-dom";
import './ProjectData.css'
import { useForm } from "react-hook-form";
import { axiosInstance, PROJECTS_URLS } from "../../../../services/urls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { projectData } from "../../../../interfaces/interface";


export default function ProjectData() {
  const navigate = useNavigate();
  const {handleSubmit, register,formState:{errors} ,reset}= useForm();
  const [Loader , setLoader] = useState(false);
  const [buttonSave , setButtonSave]= useState("save")
  const location = useLocation();
  const projectItem = location.state


  useEffect(()=>{
    if(projectItem){
      setButtonSave("Edit");
      reset({
        description:projectItem.description,
        title : projectItem.title
      })
      
      
    }
  },[])
  const saveData =async (data:projectData)=>{
  
    let id;
    if(projectItem) id = projectItem.id
    let response;
    setLoader(true)
    try {
      if(buttonSave === "save"){
        response =  await axiosInstance.post(PROJECTS_URLS.CRETE,data);
      }else if(buttonSave === "Edit"){
        response = await axiosInstance.put(PROJECTS_URLS.UPDATE(id),data);
        navigate("/dashboard/Project-List")
      }
      toast.success(response?.statusText || "success created");
      setButtonSave("save");
      reset({
        description:"",
        title : ""
      });
      
    } catch (error) {
      
    }finally{
      setLoader(false)

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
          <button type="submit" disabled={Loader} className="d-flex justify-content-center align-items-center">
            {Loader ? <ClipLoader color="#fff" size={20} /> : buttonSave}
            
          </button>
          <Link to="/dashboard/Project-List">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
