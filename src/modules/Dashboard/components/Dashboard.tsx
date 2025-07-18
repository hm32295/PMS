import Header from "../../Shared/componetns/Header/Header";
import { FaChartLine, FaTasks, FaProjectDiagram, FaUsers, FaUserSlash } from 'react-icons/fa';
import Sharts from "./Sharts";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";


export default function Dashboard() {
  const {status,infoo}=useContext(AuthContext)

  const tasksData = [
    {
      title: 'Progress',
      value: '$7328.32',
      icon: <FaChartLine size={24} />,
      cardClass: 'card_Progress_Tanya',
      iconClass: 'icon_Progress_Color',
     
       infoo:infoo?.inProgress || 0
    },
    {
      title: 'Tasks',
      value: '1293',
      icon: <FaTasks size={24} />,
      cardClass: 'card_Tasks_Mesh_Keda',
      iconClass: 'icon_Tasks_Color',
       infoo:infoo?.toDo || 0
     
    },
    {
      title: 'Done',
      value: '32',
      icon: <FaProjectDiagram size={24} />,
      cardClass: 'card_Projects_Gamda',
      iconClass: 'icon_Projects_Color',
       infoo:infoo?.done || 0
    }
  ];

  const usersData = [
    {
      title: 'Active',
      value: '$7328.32',
      icon: <FaUsers size={24} />,
      cardClass: 'card_Active_Yasta',
      iconClass: 'icon_Active_Color',
      statuos:status?.activatedEmployeeCount ??0,
    },
    {
      title: 'Inactive',
      value: '1293',
      icon: <FaUserSlash size={24} />,
      cardClass: 'card_Inactive_Khalas',
      iconClass: 'icon_Inactive_Color',
       statuos:status?.deactivatedEmployeeCount ??0
    }
  ];
  
  return (
    <div>
      <Header/>
{/* SEction Under Header InfoData */}
     <section className="section_Container_Kolo">
        <div className="container">
          <div className="row g-5">
         
            <div className="col-12 col-lg-7 Bg_YAPAA">
              <div className="section_Header_Fo2">
                <h2 className="title_Keda">Tasks</h2>
                <p className="subtitle_Yalla">Lorem ipsum dolor sit amet, consectetur</p>
              </div>
              
              <div className="row grid_Floos">
                {tasksData.map((stat, index) => (
                  <div key={index} className="col-12 col-md-12 col-lg-4">
                    <div className={`card_Sahla ${stat.cardClass}`}>
                      <div className={`icon_Container_Helwa ${stat.iconClass}`}>
                        {stat.icon}
                      </div>
                      <div className="stat_Number_Kbeer">{stat.infoo}</div>
                      <div className="stat_Label_Sagheer">{stat.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
            <div className="col-12 col-lg-5 Bg_YAPAA">
              <div className="section_Header_Fo2">
                <h2 className="title_Keda">Users</h2>
                <p className="subtitle_Yalla">Lorem ipsum dolor sit amet, consectetur</p>
              </div>
              
              <div className="row grid_Floos">
                {usersData.map((stat, index) => (
                  <div key={index} className="col-12 col-lg-6">
                    <div className={`card_Sahla ${stat.cardClass}`}>
                      <div className={`icon_Container_Helwa ${stat.iconClass}`}>
                        {stat.icon}
                      </div>
                      <div className="stat_Number_Kbeer">{stat.statuos}</div>
                      <div className="stat_Label_Sagheer">{stat.title}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Sharts/>
   
    
    
    </div>
  )
}
