import  { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEdit, faEye, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance, PROJECTS_URLS } from '../../../../services/urls';
import { ClipLoader } from 'react-spinners';
import DeleteConfirmation from '../../../Shared/componetns/DeleteConfirm/DeleteConfirmation';
import { getDataProject } from '../../../../interfaces/interface';
export default function ProjectList() {
  let{logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const [AllProjects ,setAllProjects] = useState([]);
  const[ title ,setTitle] = useState("")


  const [loders ,setLoders] = useState(false);
  const [view ,setView] = useState(false);
  const[dataView , setDataView] = useState({});
  // const [pageNumber ,setPageNumber] =useState([])
  
  const showView =(data:getDataProject)=>{
    
    setDataView(data);
    setView(true)

  }

  const getAllProjects = async ( pageNumber:number,pageSize:number,title:string  )=>{
    setLoders(true)
    try {
      const response = await axiosInstance(PROJECTS_URLS.GET,{params:{pageSize , pageNumber,title}} );
      // setPageNumber(Array(response?.data?.totalNumberOfPages).fill().map((_,i) => i+1))
      setAllProjects(response?.data?.data);
      console.log(response?.data?.data);
      setLoders(false);
      
    } catch (error) {
      setLoders(false)
      
    }
    
  }
  useEffect(()=>{
    getAllProjects(1, 5,"")
  },[])
  useEffect(()=>{
    getAllProjects(1, 5,title)
    
   },[title])
  return (
    <div className='ProjectList m-3 bg-white rounded-2'>
      <header className='p-3 d-flex justify-content-between align-items-center'>
        <span>Projects</span>
        <button onClick={()=>{navigate('/dashboard/Project-Data')}}>Add New Project</button>
      </header>
      <div className="search p-3">
        <div className="input_search bg-white">
          <FontAwesomeIcon icon={faSearch} />
          <input type="search" onChange={(e)=>{setTitle(e.target.value)}} placeholder='Search By Title ' />
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
                      AllProjects.map((ele:getDataProject)=>{
                        return(
                          <tr key={ele.id}>
                            
                              <td>{ele.title}</td>
                              <td className='Public' >Public</td>
                              <td>{ele.manager?.userName}</td>
                              <td>Num Tasks</td>
                              <td>{ele.creationDate}</td>
                              
                              <td className='action align-items-center d-flex flex-column gap-1 position-relative'>
                                    <span className='rounded-circle'></span>
                                    <span className='rounded-circle'></span>
                                    <span className='rounded-circle'></span>
                                   
                                    <div className="actions position-absolute rounded-3 bg-white end-0 d-flex flex-column">
                                      <div onClick={()=> showView(ele)}>
                                        <FontAwesomeIcon className='actions_icons' icon={faEye}  title="View" />
                                        <span>View</span>
                                        
                                      </div>
                                      <div onClick={()=>{navigate("/dashboard/Project-Data", {state : ele})}}>
                                        <FontAwesomeIcon className='actions_icons' icon={faEdit} title="Edit" />
                                        <span>edit</span>
                                      </div>
                
                                        <DeleteConfirmation nameEle={ele.title}  type='projectList' icon={faTrash} id={ele.id} getData={getAllProjects}/>
                                    
                                    </div>
                              </td>
                        </tr>
                        )
                      })
                    ) : <tr><td></td></tr>}
          
              </tbody> 
          </table>
          )}
          {view&& <View data={dataView} setView={setView}/>}
          
         
     
    </div>
  )
}

function View ({setView ,data}:{ data:getDataProject}){

 console.log(setView);
 console.log(data);
 
  
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