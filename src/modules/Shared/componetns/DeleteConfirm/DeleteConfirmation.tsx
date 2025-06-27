import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import "./DeleteConfirmation.css"
import {  faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { toast } from 'react-toastify';
import { axiosInstance, PROJECTS_URLS, TASKS_URLS } from '../../../../services/urls';
import "./DeleteConfirmation.css"
import { ClipLoader } from 'react-spinners';

export default function DeleteConfirmation({id,type,getData ,nameEle ,icon}:{id:any,type:any,getData:any,nameEle:any,icon:any}) {
  const[loder ,setLoder] = useState(false)
  let deleteElement =async()=>{
    setLoder(true)      
    try {
        
        if(type === "Tasks"){
            
            const response = await axiosInstance.delete(TASKS_URLS.DELETE(id))
        }
        if(type === "projectList"){
            
            const response = await axiosInstance.delete(PROJECTS_URLS.DELETE(id))
        }
        toast.success("delete Success!");
        handleClose()
        setLoder(false)      
        getData()
    } catch (error) {
        setLoder(false)      
        
    }
    
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    < >
        <Button className='deleteConfirm-sup' variant="primary" onClick={handleShow}
           
           style={{ cursor: "pointer" }}
        >
          {icon&&(
            <>
              <FontAwesomeIcon className='subIcon' icon={faTrashCan} />
              <span>delete</span>
            </>
          )}
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header className='closed'>
            <FontAwesomeIcon icon={faXmark} onClick={handleClose} />
          </Modal.Header>
          <Modal.Body className='data-deleteCon gap-2 d-flex justify-content-center flex-column align-items-center'>
            {/* <img src={imgNoData} alt="imgNoData" /> */}
            <h3>Delete <span className='text-white bg-danger d-inline-block rounded-1 p-1'>{nameEle}</span> ?</h3>
            <p className='text-center'>are you sure you want to delete <span className='text-white bg-danger d-inline-block rounded-1 p-1'>{nameEle}</span> ? if you are sure just click on delete it</p>
          </Modal.Body>
          <Modal.Footer className='deleteConfirmation'>
         
            <Button variant="primary" className='bg-transparent py2 px-3 border-0' onClick={deleteElement} disabled={loder}>
                {loder ?<ClipLoader  size={25} color='#000'/>:
                
                    "Delete"
                }
            </Button>
          </Modal.Footer>
        </Modal>
      </>
  )
}
