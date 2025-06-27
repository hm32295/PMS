import { useContext, useEffect, useState } from "react";
import "./TasksBoard.css"
import { AuthContext } from "../../../../context/AuthContext";
import { axiosInstance, TASKS_URLS } from "../../../../services/urls";
import TaskCol from "./TaskCol";
import { ScaleLoader } from "react-spinners";
export default function TasksBoard() {
  const { loginData, isAuthLoading }: { loginData: any; isAuthLoading: boolean } = useContext(AuthContext);
  const [tasks , setTasks] = useState([]);
  const [loder, setLoder] = useState(false)

  const getTasksToDo = async(load?:boolean)=>{
    if(loginData === null) return null;
    if(!load){
      setLoder(true)
    }
    try {
        const response = await axiosInstance(TASKS_URLS.GET);
       
        setTasks(response.data.data)
      
      } catch (error) {
        console.log(error);
        
      }finally{

        setLoder(false)
      }
    }

    useEffect(() => {
      if (!isAuthLoading && loginData) {
        getTasksToDo();
      }
    }, [isAuthLoading, loginData]);
    if(loder) return <div className="loader w-100 pt-3 d-flex justify-content-center align-items-center"><ScaleLoader  color='#EF9B28'/></div>
  return (
    <div className="TasksBoard">
      <header className='p-3 d-flex justify-content-between align-items-center'>
        <span>Task Board</span>
      </header>
      <div className="status d-flex gap-2 flex-wrap">
        {tasks.length &&(
          <>
              <TaskCol {...{getTasksToDo}} {...{tasks}} title="ToDo"/>
              <TaskCol {...{getTasksToDo}} {...{tasks}} title="InProgress"/>
              <TaskCol {...{getTasksToDo}} {...{tasks}} title="Done"/>
          </>
        )}
      </div>


      <div className="test">

      </div>
    </div>
  )
}
