import  {  useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEdit, faEye, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance, PROJECTS_URLS } from '../../../../services/urls';
import { ScaleLoader } from 'react-spinners';
import DeleteConfirmation from '../../../Shared/componetns/DeleteConfirm/DeleteConfirmation';
import { getDataProject } from '../../../../interfaces/interface';
import ViewData from './ViewData';
import { AuthContext } from '../../../../context/AuthContext';
import PaginationTest from './Pagination';
import NoData from '../../../Shared/componetns/NoData/NoData';
export default function ProjectList() {
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);


  let{loginData,isAuthLoading}:{loginData:any,isAuthLoading:any} = useContext(AuthContext);
  const navigate = useNavigate();
  const [AllProjects ,setAllProjects] = useState([]);
  const[ title ,setTitle] = useState("");
  const [loders ,setLoders] = useState(false);
  const [view ,setView] = useState(false);
  const[dataView , setDataView] = useState<getDataProject |null>(null);

  
  const showView =(data:getDataProject)=>{
    setDataView(data);
    setView(true);
  }

  const fetchProjects  = async ( pageNumber:number,pageSize:number,title:string  )=>{
    if(loginData === null) return
    setLoders(true)
    try {
      let response;
      
      if(loginData?.userGroup === 'Employee' ){
        response = await axiosInstance(PROJECTS_URLS.GET_EMPLOYEE,{params:{pageSize , pageNumber,title}} );
      }else if(loginData?.userGroup === 'Manager'){
        response = await axiosInstance(PROJECTS_URLS.GET_MANAGER,{params:{pageSize , pageNumber,title}} );

      }
      
      setTotalResults(response?.data?.totalNumberOfRecords);
      setTotalPages(response?.data?.totalNumberOfPages);
      setAllProjects(response?.data?.data);
      
    } catch (error) {
      console.log(error);
      
    }finally {
      setLoders(false)

    }
    
  }
  useEffect(()=>{
    if(!isAuthLoading && loginData){
      fetchProjects (1, 10,"")
    }
  },[isAuthLoading,loginData])
  useEffect(()=>{
    fetchProjects (1, 5,title)
    
   },[title])
  return (
    <div className='ProjectList m-3 bg-white rounded-2 '>
      <header className='p-3 d-flex justify-content-between align-items-center'>
        <span>Projects</span>
        {loginData?.userGroup === "Manager" &&(
          <button onClick={()=>{navigate('/dashboard/Project-Data')}}>Add New Project</button>
        )}
      </header>
      <div className="search p-3">
        <div className="input_search bg-white">
          <FontAwesomeIcon icon={faSearch} />
          <input type="search" onChange={(e)=>{setTitle(e.target.value)}} placeholder='Search By Title ' />
        </div>
      </div>
      <div className='overflow-auto w-100 table-data'>
        {!loders && !AllProjects.length ?<NoData /> :(<>
            {loders? <div className='d-flex justify-content-center p-5'><ScaleLoader  color='#EF9B28'/></div> :
                      <>
                              <table className='w-100'>
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
                                                  <td className='Public' >{ele.manager?.isActivated ? "Public" : "No Public"}</td>
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

                                                          {loginData?.userGroup === "Manager" &&(
                                                            <>
                                                              <div onClick={()=>{navigate("/dashboard/Project-Data", {state : ele})}}>
                                                                <FontAwesomeIcon className='actions_icons' icon={faEdit} title="Edit" />
                                                                <span>edit</span>
                                                              </div>
                                        
                                                                <DeleteConfirmation nameEle={ele.title}  type='projectList' icon={faTrash} id={ele.id} getData={fetchProjects }/>
                                                            </>
                                                          )}
                                                        
                                                        </div>
                                                  </td>
                                            </tr>
                                            )
                                          })
                                        ) : <tr><td></td></tr>}
                              
                                  </tbody> 
                              </table>
                      </>
            }
        </>)}
   <PaginationTest {...{totalPages}} {...{totalResults}} getAllData={fetchProjects} />
  

              {view && <ViewData data={dataView} setView={setView}/>} 
              
      </div>
         
     
    </div>
  )
}

