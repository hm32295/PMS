
import imgNotFound1 from "../../../../assets/image/imgNotFound1.png";
import imgNotFound2 from "../../../../assets/image/imgNotFound2.png";
import logoNotFound2 from "../../../../assets/icons/logoNotFound.svg";



import "./NotFound.css"; // لإنك ممكن تضيف تنسيقات خاصة
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notFound d-flex align-items-center justify-content-between">
      <div className="left h-100 d-flex flex-column justify-content-start gap-5 p-1 ">
        <img src={logoNotFound2} alt="" />
        <div className="text p-1">
          <h3 className="text-capitalize">oops.</h3>
          <h4>page not found

          <span>
              <div></div>
              <div></div>
              <div></div>
            </span>
          </h4>
          <p>This Page doesn’t exist or was removed!
          We suggest you  back to home.</p>
          <button className="text-white" onClick={()=>{navigate("../")}}>back to home</button>
        </div>
      </div>
      <div className="img">
        <img src={imgNotFound2} className="w-75 float-end" alt="" />
      </div>
    </div>
  );
}

