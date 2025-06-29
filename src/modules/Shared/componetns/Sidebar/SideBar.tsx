
import { AiFillHome } from 'react-icons/ai';
import { HiUsers } from 'react-icons/hi';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { BsCalendar2Check } from 'react-icons/bs';
import { TbArrowsExchange } from "react-icons/tb";
import { BiLogOut } from 'react-icons/bi';
import { useLocation } from 'react-router-dom';
import './sidepar.css';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";


interface SidebarProps {
  open: boolean;
  onToggle: () => void;
  isSmallScreen: boolean;
}

const SideBar = ({ open, onToggle, isSmallScreen }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { icon: AiFillHome, label: 'Home', path: '/dashboard' },
    { icon: HiUsers, label: 'Users', path: '/dashboard/users' },
    { icon: BsGrid3X3Gap, label: 'Projects', path: '/dashboard/project-List' },
    { icon: BsCalendar2Check, label: 'Tasks', path: '/dashboard/tasks-list' },
    { icon: BsCalendar2Check, label: 'Tasks', path: '/dashboard/tasks-board' },
    { icon: TbArrowsExchange , label: 'Change Password', path: '/change-password' },
  ];

  const isActive = (path: string) => location.pathname === path;

  if (isSmallScreen && !open) {
    return null;
  }

  const sidebarClass = isSmallScreen 
    ? 'sidebar-container sidebar-mobile' 
    : `sidebar-container sidebar-desktop ${open ? 'sidebar-open' : 'sidebar-collapsed'}`;


  return (
    <div className={sidebarClass}>
    
      <div className="sidebar-header">
        <button onClick={onToggle} className="toggle-button">
          {open ? (
            <MdKeyboardDoubleArrowLeft size={24} />
          ) : (
            <MdKeyboardDoubleArrowRight size={24} />
          )}
        </button>
      </div>

     
      <div className="sidebar-menu">
        <nav className="menu-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              >
                <div className="menu-icon">
                  <Icon size={20} />
                </div>
                {(open || !isSmallScreen) && (
                  <span className="menu-label">{item.label}</span>
                )}
                
                {isActive(item.path) && (
                  <div className="active-indicator" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

     
      <div className="sidebar-footer">
        <button className="menu-item logout-btn">
          <div className="menu-icon">
            <BiLogOut size={20} />

          </div>
          {(open || !isSmallScreen) && (
            <span className="menu-label">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default SideBar;
