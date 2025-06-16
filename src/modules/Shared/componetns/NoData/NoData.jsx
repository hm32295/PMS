import imgNoData from "../../../../assets/image/no-data.png";
import "./NoData.css"

export default function NoData() {
  return (
    <div className="NoData d-flex justify-content-center flex-column align-items-center gap-1 py-4 pt-5">
      
      <img src={imgNoData} alt="imgNoData" />
      <h3 className="py-3">No Data !</h3>
      <p>are you sure you want to delete this item ? if you are sure just click on delete it</p>
    </div>
  )
}
