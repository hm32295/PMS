import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function ProjectList() {
  let{logout} = useContext(AuthContext);
  const navigate = useNavigate()
  return (
    <div>ProjectList

      <button onClick={()=> {logout();navigate("/")}}>log out</button>
    </div>
  )
}
