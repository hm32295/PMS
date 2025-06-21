import  { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance, PROJECTS_URLS } from '../../../../services/urls';
import { ClipLoader } from 'react-spinners';
export default function ProjectList() {
  let{logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [AllProjects ,setAllProjects] = useState([]);
  const [loders ,setLoders] = useState(false);
  const getAllProjects = async (pageSize:number , pageNumber:number )=>{
    setLoders(true)
    try {
      const response = await axiosInstance(PROJECTS_URLS.GET,{params:{pageSize , pageNumber}} );
      setAllProjects(response.data.data);
      setLoders(false)
      // console.log((response.data.data));
      
    } catch (error) {
      setLoders(false)
      // console.log(error);
      
    }
    
  }
  useEffect(()=>{
    getAllProjects(1, 5)
  },[])
  return (
    <div className='ProjectList m-3 bg-white rounded-2'>
      <header className='p-3 d-flex justify-content-between align-items-center'>
        <span>Projects</span>
        <button onClick={()=>{navigate('/dashboard/Project-Data')}}>Add New Project</button>
      </header>
      <div className="search p-3">
        <div className="input_search bg-white">
          <FontAwesomeIcon icon={faSearch} />
          <input type="search" placeholder='Search By Title ' />
        </div>
      </div>
      {loders? <div className='d-flex justify-content-center p-5'><ClipLoader  size={50} color='#000'/></div> :
        (
          <table>
              <thead>
                <tr>
                  <th>Title </th>
                  <th>Statues </th>
                  <th>Num Users </th>
                  <th>Num Tasks </th>
                  <th>Date Created </th>
                  <th> action</th>
                </tr>
              </thead>
              <tbody >
              
            
                    {AllProjects.length ?
                    (
                      AllProjects.map(ele=>{
                        return(
                          <tr key={ele.id}>
                              <td>{ele.title}</td>
                              <td className='Public' >Public</td>
                              <td>{ele.manager.userName}</td>
                              <td>Num Tasks</td>
                              <td>{ele.creationDate}</td>
                              <td className='action align-items-center d-flex flex-column gap-1 position-relative'>
                                    <span className='rounded-circle'></span>
                                    <span className='rounded-circle'></span>
                                    <span className='rounded-circle'></span>
                                    <div className="actions position-absolute top-100 rounded-3 bg-white end-0 d-flex flex-column">
                                      <div>
                                        <FontAwesomeIcon className='actions_icons' icon={faEye}  title="View" />
                                        <span>View</span>
                                      </div>
                                      <div>
                                        <FontAwesomeIcon className='actions_icons' icon={faEdit} title="Edit" />
                                        <span>edit</span>
                                      </div>
                                      <div>
                                        <FontAwesomeIcon className='actions_icons' icon={faTrash} title="Delete" />
                                        <span>delete</span>
                                      </div>
                                    </div>
                              </td>
                        </tr>
                        )
                      })
                    ) : <tr><td></td></tr>}
          
              </tbody> 
          </table>
          )}

     
    </div>
  )
}
