import React, { useContext } from 'react';
import './header.css';
import { AuthContext } from '../../../../context/AuthContext';

const Header = () => {
  let auth=useContext(AuthContext)
    const { Userdata } = auth;
      const name = Userdata?.userName;   
  return (
    <section className="header-section">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="header-content">
              <h1 className="header-title">
                Welcome <span className="highlight">{name}</span>
              </h1>
              <p className="header-subtitle">
                You can add project and assign tasks to your team
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
