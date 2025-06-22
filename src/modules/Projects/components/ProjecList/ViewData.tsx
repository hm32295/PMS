import { faClose } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getDataProject } from "../../../../interfaces/interface"

export default function ViewData ({setView ,data}:{ setView: any,data:getDataProject}){

    return(
      <div className='view position-fixed top-0 start-0 d-flex justify-content-center align-items-center  z-2 h-100 w-100'>
        <div className='d-flex flex-column align-items-end gap-2'>
  
          <FontAwesomeIcon  onClick={()=>{setView(false)}} 
          icon={faClose} className='text-black p-2 border-2 rounded-circle bg-white'
            
          />
          <table className="table  rounded-3  w-100 bg-white ">
            <thead className="thead-dark">
              <tr>
                <th scope="col">title</th>
                <th scope="col">description</th>
                <th scope="col">creation Date</th>
                <th scope="col">modification Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data.title}</td>
                <td>{data.description}</td>
                <td>{data.creationDate}</td>
                <td>{data.modificationDate}</td>
                
              </tr>
           
            </tbody>
          </table>
        </div>
      </div>
  
    )
  }