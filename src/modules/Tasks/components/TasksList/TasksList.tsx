
import  {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEdit, faEye, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance, TASKS_URLS } from '../../../../services/urls';
import { ClipLoader } from 'react-spinners';
import DeleteConfirmation from '../../../Shared/componetns/DeleteConfirm/DeleteConfirmation';
import { getAllTasks, pageDataCalc } from '../../../../interfaces/interface';
import ViewData from './ViewData';
import './TasksList.css'
import PaginationPage from './Pagination';
export default function TasksList() {
  // let{logout}:{logout:any} = useContext(AuthContext);
  const navigate = useNavigate();
  const [AllProjects ,setAllProjects] = useState([]);
  const[ title ,setTitle] = useState("");
  const [loders ,setLoders] = useState(false);
  const [view ,setView] = useState(false);
  const[dataView , setDataView] = useState<getAllTasks |null>(null);
  const [PagesList ,setPagesList] =useState([]);
  const [pageData , setPageData] = useState<pageDataCalc | null>(null)
  
  const showView =(data:getAllTasks)=>{
    setDataView(data);
    setView(true);
  }

  const getAllTasks = async ( pageNumber:number,pageSize:number,title:string  )=>{
    setLoders(true)
    try {
      const response = await axiosInstance(TASKS_URLS.GET_MANGER,{params:{pageSize , pageNumber,title}} );
      setPageData({
        pageNumber: response?.data?.pageNumber,
        totalNumberOfRecords: response?.data?.totalNumberOfRecords,
        totalNumberOfPages: response?.data?.totalNumberOfPages
      });
      
      setPagesList(Array(response?.data?.totalNumberOfPages).fill().map((_,i) => i+1))
      setAllProjects(response?.data?.data);
      setLoders(false);
      
    } catch (error) {
      console.log(error);
      
      setLoders(false)
      
    }
    
  }
  useEffect(()=>{
    getAllTasks(1, 5,"")
  },[])
  useEffect(()=>{
    getAllTasks(1, 5,title)
    
   },[title])
  return (
    <div className='ProjectList TasksList m-3 bg-white rounded-2 '>
      <header className='p-3 d-flex justify-content-between align-items-center'>
        <span>Tasks</span>
        <button onClick={()=>{navigate('/dashboard/tasks-Data')}}>Add New Task</button>
      </header>
      <div className="search p-3">
        <div className="input_search bg-white">
          <FontAwesomeIcon icon={faSearch} />
          <input type="search" onChange={(e)=>{setTitle(e.target.value)}} placeholder='Search By Title ' />
        </div>
      </div>
      <div className='overflow-auto w-100'>

       {loders? <div className='d-flex justify-content-center p-5'><ClipLoader  size={50} color='#000'/></div> :
            (
              <table className='w-100'>
                  <thead>
                    <tr>
                      <th>Title </th>
                      <th>Statues </th>
                      <th>User </th>
                      <th>Project </th>
                      <th>Date Created </th>
                      <th> action</th>
                    </tr>
                  </thead>
                  <tbody >
                  
                
                        {AllProjects.length ?
                        (
                          
                          
                          AllProjects.map((ele:getAllTasks)=>{
                          
                            return(
                              <tr key={ele.id}>
                                
                                  <td>{ele.title}</td>
                                  <td className={`Public ${!ele.employee?.isVerified && 'in-progress'}`} >
                                      {ele.employee?.isVerified ? "done" : "in-progress"}
                                      </td>
                                  <td>{ele.employee?.userName}</td>
                                  <td>{ele.project?.title}</td>
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
                                          <div onClick={()=>{navigate("/dashboard/tasks-Data", {state : ele})}}>
                                            <FontAwesomeIcon className='actions_icons' icon={faEdit} title="Edit" />
                                            <span>edit</span>
                                          </div>
                    
                                            <DeleteConfirmation nameEle={ele.title}  type='tasks' icon={faTrash} id={ele.id} getData={getAllTasks}/>
                                        
                                        </div>
                                  </td>
                            </tr>
                            )
                          })
                        ) : <tr><td></td></tr>}
              
                  </tbody> 
              </table>
              )}

              <PaginationPage funData={getAllTasks} pages={PagesList} pageData={pageData}/>
              {view && <ViewData data={dataView} setView={setView}/>} 
              
      </div>
         
     
    </div>
  )
}

