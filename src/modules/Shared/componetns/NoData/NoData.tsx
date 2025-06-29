import noData from "../../../../assets/image/noData.png"
import '../NotFound/notfound.css'
export default function NoData() {
  return (
     <div className="not-found-container h-auto">
      <div className="error-content w-100">
        <h1 className="error-number  ">
        </h1>
          <img className="w-100" src={noData} alt="no data" />
        <p className="error-message">No data available</p>
       
      </div>
    </div>
  )
}
