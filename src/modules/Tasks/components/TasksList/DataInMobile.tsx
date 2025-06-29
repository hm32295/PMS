import {  faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteConfirmation from "../../../Shared/componetns/DeleteConfirm/DeleteConfirmation";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";


export default function DataInMobile({data ,getAllTasks,navigate}) {
    const {loginData} = useContext(AuthContext)
  return (
   
    <div className='DataInMobile d-flex flex-column mt-4 gap-2'>
        <div className="users flex-wrap align-items-center justify-content-start d-flex gap-2 rounded-2 bg-white p-2 py-3">
            <div className="icons_user">
                <FontAwesomeIcon icon={faUser}   className="icon"/>
            </div>
            <div className="data d-flex flex-column align-items-start justify-content-center">
                <h1>{data.employee.userName}</h1>
                <p>Title: {data.title}</p>
                <p>Email: {data.employee.email}</p>
                <p>phone: {data.employee.phoneNumber}</p>
                <span className="status">status: 
                  <span className={`${data.status === "InProgress" && "bg-danger"}
                                  ${data.status === 'Done' && "bg-danger-subtle text-black"}`}>
                        {data.status}
                  </span>
                </span>
            </div>
            {loginData.userGroup !== "Employee" &&(
              <div className='action align-items-center d-flex flex-column gap-1 position-relative'>
                    <span className='rounded-circle'></span>
                    <span className='rounded-circle'></span>
                    <span className='rounded-circle'></span>
                
                    <div className="actions position-absolute rounded-3 end-0 d-flex flex-column">
                      
                        <div onClick={()=>{navigate("/dashboard/tasks-Data", {state : data})}}>
                            <FontAwesomeIcon className='actions_icons' icon={faEdit} title="Edit" />
                            <span>edit</span>
                        </div>
                          <DeleteConfirmation nameEle={data.title}  type='tasks' icon={faTrash} id={data.id} getData={getAllTasks}/>
                        </div>
                </div>
            )}
        </div>
    </div>
  )
}
