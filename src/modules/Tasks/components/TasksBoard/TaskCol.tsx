import { axiosInstance, TASKS_URLS } from "../../../../services/urls"

interface TTasks {
    status : string
    title : string
    id: number

}

type TTitle = "ToDo" | "InProgress" | "Done"
export default function TaskCol({tasks,title ,getTasksToDo} : {tasks : TTasks, title:TTitle}) {
   
    const changeStatus = async (newStatus:string , id:number)=>{
      await axiosInstance.put(TASKS_URLS.CHANGE_STATUS(id), {status : newStatus})
    }
  return (
    <div className="">
            <span className="p-2 d-inline-block">{title}</span>
            <div
            onDrop={ async (e)=>{
                e.preventDefault();
                let id = e. dataTransfer.getData("id")
                await changeStatus(title , +id);
                await getTasksToDo()
                
            }}
            onDragOver={(e)=> e.preventDefault()}
            className="mt-2 d-flex p-2 pt-4 rounded-2  align-items-center flex-column gap-2 text-white">
            {
                tasks.map((task:any)=>{
                    
                    if(task.status === title){
                    return(
                        <p
                            
                            draggable={true}
                            onDragStart={(e)=> e.dataTransfer.setData("id" , task.id)   }
                            key={task.id} className="rounded-1 p-2 text-white w-100 px-3"
                        >
                            {task.title}
                         </p>
                    )
                    }
                })
                
            }
            </div>
  </div>
  )
}