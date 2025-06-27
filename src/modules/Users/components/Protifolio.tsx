import React, { useContext } from 'react';
import '../components/UsersList/profile.css';
import AuthLayout from '../../Shared/componetns/AuthLayout/AuthLayout';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
const Profile = () => {
 
let {Userdata}=useContext(AuthContext)
let navi=useNavigate()
let FunNavi_To_Change=()=>{
    navi('/dashboard/Changeinfo')
}
  return (
    <div className="safa7a_profile_ya3taa">
      <div className="container_profile_kol_7aga">
        <div className="card_profile_ra2eesy">
          <div className="d-block m-auto text-center">
         {/* <img src="" alt="00" className='d-block m-auto text-center' /> */}
          </div>
         
          <div className="section_bayanat_profile">
            <div className="saff_inputs_profile">
              <div className="group_input_profile">
                <label className="label_input_profile">User Name</label>
                <input 
                  type="text" 
                  value={Userdata?.userName}
                  readOnly
                  className="input_Name_Profile_Ya3taa"
                />
              </div>
              
              <div className="group_input_profile">
                <label className="label_input_profile">Email</label>
                <input 
                  type="email" 
                  value={Userdata?.email}
                  readOnly
                  className="input_Email_Profile_Ya3taa"
                />
              </div>
            </div>

            <div className="saff_inputs_profile">
              <div className="group_input_profile">
                <label className="label_input_profile">Country</label>
                <input 
                  type="text" 
                  value={Userdata?.country}
                  readOnly
                  className="input_Country_Profile_Ya3taa"
                />
              </div>
              
              <div className="group_input_profile">
                <label className="label_input_profile">Phone Number</label>
                <input 
                  type="tel" 
                  value={Userdata?.phoneNumber}
                  readOnly
                  className="input_Phone_Profile_Ya3taa"
                />
              </div>
            </div>

         

            <div className="saff_inputs_profile d-block m-auto w-100">
              <div className="group_input_profile">
                <label className="label_input_profile">Join on</label>
                <input 
                  type="text" 
                  value={Userdata?.creationDate}
                  readOnly
                  className="input_Date_Profile_Ya3taa"
                />
              </div>
                    
         
            </div>
                <div className="saff_inputs_profile mt-3 w-100">
              <div className="group_input_profile">
                <label className="label_input_profile">Role</label>
                <input 
                  type="text" 
                  value={Userdata?.group?.name}
                  readOnly
                  className="input_Country_Profile_Ya3taa"
                />
              </div>
              
              <div className="group_input_profile">
                <label className="label_input_profile">Is Active?</label>
                <input 
                  type="tel" 
                  value={Userdata?.isActivated?'Active':'None Active'}
                  readOnly
                  className="input_Phone_Profile_Ya3taa"
                />
              </div>
            </div>

           
            

            <div className="section_button_profile"  onClick={FunNavi_To_Change}>
              <button className="button_Account_Info_Ya3taa">
            Change info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
