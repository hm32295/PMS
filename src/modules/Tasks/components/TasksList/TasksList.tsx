
import  {  useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance, TASKS_URLS } from '../../../../services/urls';
import { ScaleLoader } from 'react-spinners';
import DeleteConfirmation from '../../../Shared/componetns/DeleteConfirm/DeleteConfirmation';
import { getAllTasks } from '../../../../interfaces/interface';
import ViewData from './ViewData';
import './TasksList.css'
import { AuthContext } from '../../../../context/AuthContext';
import PaginationTest from './Pagination';
import NoData from '../../../Shared/componetns/NoData/NoData';
import DataInMobile from './DataInMobile';
export default function TasksList() {
  
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const { loginData, isAuthLoading }: { loginData: any; isAuthLoading: boolean } = useContext(AuthContext);

  const navigate = useNavigate();
  const [AllProjects ,setAllProjects] = useState([]);
  const[ title ,setTitle] = useState("");
  const [Loader ,setLoader] = useState(false);
  const [view ,setView] = useState(false);
  const[dataView , setDataView] = useState<getAllTasks |null>(null);
  
  const showView =(data:getAllTasks)=>{
    setDataView(data);
    setView(true);
  }

  const getAllTasks = async ( pageNumber:number,pageSize:number,title:string  )=>{
    setLoader(true);
    if(loginData === null) return
    try {
      let response;
      if(loginData.userGroup === 'Employee' ){
         response = await axiosInstance(TASKS_URLS.GET,{params:{pageSize , pageNumber,title}} );
      }else if(loginData.userGroup === 'Manager'){
         response = await axiosInstance(TASKS_URLS.GET_MANGER,{params:{pageSize , pageNumber,title}} );

      }

      setTotalResults(response?.data?.totalNumberOfRecords);
      setTotalPages(response?.data?.totalNumberOfPages);

   
      setAllProjects(response?.data?.data);
      setLoader(false);
      
    } catch (error) {
      console.log(error);
      
      setLoader(false)
      
    }
    
  }
  useEffect(()=>{
    if (!isAuthLoading && loginData) {
      getAllTasks(1, 10,"")
    }
  },[loginData ,isAuthLoading])
  useEffect(()=>{
    getAllTasks(1, 10,title)
    
   },[title])
  return (
    <div className='ProjectList TasksList bg-white rounded-2 '>
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

          <div className=' table-data overflow-auto'>
            {AllProjects.length === 0 && !Loader ? <NoData />:(
              <>
                  {Loader? <div className='d-flex justify-content-center p-5'><ScaleLoader  color='#EF9B28'/></div> :
                      (
                        <table className=''>
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
                                            <td className={``} > {ele.status}</td>
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
                            <div className='data_small_screen'>
                              {AllProjects.length ?
                                    ( 
                                      AllProjects.map((ele:getAllTasks)=>{
                                          return <DataInMobile key={ele.id} data={ele} {...{getAllTasks}} {...{navigate}}/>
                                      })):""
                               }
                            </div>
                          <PaginationTest {...{totalPages}} {...{totalResults}} getAllData={getAllTasks} />
                        {view && <ViewData data={dataView} setView={setView}/>} 
              </>
        )}
        
                  
          </div>
         
     
    </div>
  )
}


