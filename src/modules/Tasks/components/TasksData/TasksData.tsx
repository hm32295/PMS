
import { Link, useLocation, useNavigate } from "react-router-dom";
import './TasksData.css'
import { useForm } from "react-hook-form";
import { axiosInstance, PROJECTS_URLS, TASKS_URLS, USERS_URLS } from "../../../../services/urls";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader, ScaleLoader } from "react-spinners";
import {employeesType, getDataProject, projectData } from "../../../../interfaces/interface";


export default function TasksData() {
  const navigate = useNavigate();
  const {handleSubmit, register,formState:{errors} ,reset}= useForm();
  const [loder , setLoder] = useState(false);
  const [buttonSave , setButtonSave]= useState("save")
  const location = useLocation();
  const projectItem = location.state;

  const [getProject , setGetProject] = useState([])
  const [getUsers , setGetUsers] = useState([])


  const getAllUsers = async()=>{
    setLoder(true);
    try {
      const response = await axiosInstance(USERS_URLS.GET_USERS ,{params:{pageNumber: 1, pageSize:50}})
      setGetUsers(response.data.data);
      setLoder(false)
    } catch (error) {
      setLoder(false)
      
    }
    
  }
  const getAllProject = async()=>{
    setLoder(true);
    try {
      const response = await axiosInstance(PROJECTS_URLS.GET,{params:{pageNumber: 1, pageSize:50}})
      setGetProject(response.data.data)
    
    } catch (error) {
      
    }
    finally{
      setLoder(false)

    }
  
  }
  const getUsersAndProject = async ()=>{
    await getAllUsers()
    await getAllProject()
  }
  useEffect( ()=> {
    if(projectItem){
      setButtonSave("Edit");
      
      reset({
        description:projectItem.description,
        title : projectItem.title,
        employeeId: projectItem.employee?.id,
        projectId: projectItem.project?.id,
      })
      
      
    }
    getUsersAndProject()
  },[])
  const saveData =async (data:projectData)=>{
    const cleanData = {
      title: data.title.trim(),
      description: data.description.trim(),
      employeeId: Number(data.employeeId),
      projectId: Number(data.projectId)
    };
    let id;
    if(projectItem) id = projectItem.id
    let response;
    setLoder(true)
    try {
      if(buttonSave === "save"){
        response =  await axiosInstance.post(TASKS_URLS.CREATE,cleanData);
        toast.success(response?.statusText || "success created");
     
      }else if(buttonSave === "Edit"){
        response = await axiosInstance.put(TASKS_URLS.UPDATE(id),data);
        toast.success(response?.statusText || "success created");
        

      }
      navigate("/dashboard/tasks-List");
      setLoder(false);
      setButtonSave("save");
      reset({
        description:"",
        title : ""
      });
      
    } catch (error) {
      setLoder(false)
      
    }
    
  }
  if(loder) return <div className="loader"><ScaleLoader  color='#EF9B28'/></div>
  return (
    <div className='ProjectData TasksData'>
      <header >
        <button onClick={()=>{navigate('/dashboard/tasks-List')}}>View All Task</button>
        <h2>Add a New Task</h2>
      </header>
      <form action="" onSubmit={handleSubmit(saveData)}>
        <div className="title">
          <label> title</label>
          <input type="text" placeholder="Name" {...register("title",{required: "Field is required"} )}/>
          {errors?.title&&<div className="text-danger mb-2">{errors?.title?.message}</div>}
        </div>


        <div className="discripton">
          <label htmlFor="">Description</label>
          <textarea placeholder="Description" {...register("description",{required: "Field is required"} )}></textarea>
          {errors?.description&&<div className="text-danger mb-2">{errors?.description?.message}</div>}
        </div>

        <div className="selectTasks d-flex justify-content-between gap-2 flex-wrap">
          <div className="users">
              <label htmlFor="users">users</label>
              <select  id="users" {...register("employeeId" ,{required:"faild is required"})}>
                <option value="">users</option>
                {getUsers.length&&(
                  getUsers.map((ele:employeesType)=>{
                  
                    
                    return(
                      <Fragment key={ele.id} >
                        <option value={ele.id}>{ele.userName}</option>
                      </Fragment >
                    )
                  })
                )}
              </select>
              {errors?.employeeId&&<div className="text-danger mb-2">{errors?.employeeId?.message}</div>}
          </div>
          <div className="project">
              <label htmlFor="project">project</label>
              <select  id="project" {...register("projectId" ,{required:"faild is required"})}>
                <option value="">project</option>
                {getProject.length&&(
                  getProject.map((ele:getDataProject)=>{
                  
                    return(
                      
                      <Fragment  key={ele.id}>
                        <option value={ele.id}>{ele.title}</option>
                      </Fragment >
                    )
                  })
                )}
              </select>
              {errors?.projectId&&<div className="text-danger mb-2">{errors?.projectId?.message}</div>}
          </div>
        </div>





        <div className="buttons">
          <button type="submit" disabled={loder} className="d-flex justify-content-center align-items-center">
            {loder ? <ClipLoader color="#fff" size={20} /> : buttonSave}
            
          </button>
          <Link to="/dashboard/tasks-List">Cancel</Link>
        </div>
      </form>
    </div>
  )
}
