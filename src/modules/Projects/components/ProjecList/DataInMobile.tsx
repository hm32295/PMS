import {  faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteConfirmation from "../../../Shared/componetns/DeleteConfirm/DeleteConfirmation";

export default function DataInMobile({data ,AllProjects,navigate}) {
 
    
  return (
   
    <div className='DataInMobile d-flex flex-column mt-4 gap-3'>
        <div className="users align-items-center justify-content-start d-flex gap-4 rounded-2 bg-white p-2">
            
            <FontAwesomeIcon icon={faUser}   className="icon"/>
            <div className="data d-flex flex-column align-items-start justify-content-center">
                <h1>{data.title}</h1>
                <p>modification Date: {data.modificationDate}</p>
                <p>description: {data.description}</p>
            </div>
           <div className='action align-items-center d-flex flex-column gap-1 position-relative'>
                <span className='rounded-circle'></span>
                <span className='rounded-circle'></span>
                <span className='rounded-circle'></span>
            
                <div className="actions position-absolute rounded-3 end-0 d-flex flex-column">
                   
                    <div onClick={()=>{navigate("/dashboard/tasks-Data", {state : data})}}>
                        <FontAwesomeIcon className='actions_icons' icon={faEdit} title="Edit" />
                        <span>edit</span>
                    </div>
                      <DeleteConfirmation nameEle={data.title}  type='tasks' icon={faTrash} id={data.id} getData={AllProjects}/>
                    </div>
             </div>
        </div>
    </div>
  )
}
