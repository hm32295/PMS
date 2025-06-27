import React, { useState } from 'react';
import './notfound.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function NotFound() {
  let location=useLocation()
 let funHome=()=>{
    navi('/dashboard')
  }
  let navi=useNavigate()
  return (
    <div className="not-found-container">
      <div className="error-content">
        <h1 className="error-number error-number-not-found">404</h1>
        <p className="error-message">Page :<span > {location.pathname}</span> Not Found </p>
        <button className='Dashboard_Unfound mt-2'onClick={funHome}>Dashboard</button>
      </div>
    </div>
  );
}
