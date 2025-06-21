import { useNavigate } from "react-router-dom"


export default function ProjectData() {
  const navigate = useNavigate()
  return (
    <div className='ProjectData'>
      <header >
        <button onClick={()=>{navigate('/dashboard/Project-List')}}>View All Projects</button>
        <h2>Add a New Project</h2>
      </header>
    </div>
  )
}
