import  {  useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectList.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEdit, faEye, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { axiosInstance, PROJECTS_URLS } from '../../../../services/urls';
import { ClipLoader } from 'react-spinners';
import DeleteConfirmation from '../../../Shared/componetns/DeleteConfirm/DeleteConfirmation';
import { getDataProject, pageDataCalc } from '../../../../interfaces/interface';
import ViewData from './ViewData';
import PaginationPage from './Pagination';
export default function ProjectList() {
 
  const navigate = useNavigate()
  return (
    <div>ProjectList

    </div>
  )
}

