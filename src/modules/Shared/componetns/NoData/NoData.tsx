import React from 'react'
import '../NotFound/notfound.css'
export default function NoData() {
  return (
     <div className="not-found-container">
      <div className="error-content">
        <h1 className="error-number">404</h1>
        <p className="error-message">No data available</p>
       
      </div>
    </div>
  )
}
