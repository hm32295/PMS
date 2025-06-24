
import { Link, useLocation, useNavigate } from "react-router-dom";
import './TasksData.css'
import { useForm } from "react-hook-form";
import { axiosInstance, PROJECTS_URLS, TASKS_URLS, USERS_URLS } from "../../../../services/urls";
import { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
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
      const response = await axiosInstance(USERS_URLS.GET_USERS)
      setGetUsers(response.data.data);
      setLoder(false)
    } catch (error) {
      setLoder(false)
      
    }
    
  }
  const getAllProject = async()=>{
    setLoder(true);
    try {
      const response = await axiosInstance(PROJECTS_URLS.GET)
      setGetProject(response.data.data)
      setLoder(false)
    } catch (error) {
      setLoder(false)
      
    }
  
  }

  useEffect(()=>{
    if(projectItem){
      setButtonSave("Edit");
      
      reset({
        description:projectItem.description,
        title : projectItem.title,
        employeeId: projectItem.employee?.id,
        projectId: projectItem.project?.id,
      })
      
      
    }
    getAllUsers()
    getAllProject()
  },[])
  const saveData =async (data:projectData)=>{
    // console.log(data);
    
    let id;
    if(projectItem) id = projectItem.id
    let response;
    setLoder(true)
    try {
      if(buttonSave === "save"){
        console.log(data);
        // https://upskilling-egypt.com:3003/api/v1/Task
        console.log(TASKS_URLS);
        
        response =  await axiosInstance.post(TASKS_URLS.CREATE,data);
        toast.success(response?.statusText || "success created");
      }else if(buttonSave === "Edit"){
        response = await axiosInstance.put(TASKS_URLS.UPDATE(id),data);
        toast.success(response?.statusText || "success created");

      }
      setLoder(false);
      setButtonSave("save");
      // setPageNumber(Array(response.data.totalNumberOfPages).fill().map((_,i) => i+1))
      reset({
        description:"",
        title : ""
      });
      
    } catch (error) {
      setLoder(false)
      
    }
    
  }
  
  return (
    <div className='ProjectData TasksData'>
      <header >
        <button onClick={()=>{navigate('/dashboard/tasks-List')}}>View All Task</button>
        <h2>Add a New Task</h2>
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
