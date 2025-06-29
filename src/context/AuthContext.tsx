import { useEffect, useState, createContext } from "react";

import { jwtDecode } from "jwt-decode";
import { axiosInstance, USERS_URLS } from "../services/urls";

export const AuthContext:any = createContext();
export default function AuthContextProvider({ children }:{children:any}) {
    const [loginData, setLoginData] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const saveLoginData =() => {
      try {
        const encodedToken = localStorage.getItem("token");
       
        if (!encodedToken) return;
        
        const decodedToken:any = jwtDecode(encodedToken);
        setLoginData(decodedToken);
    
        
        setIsAuthLoading(false);
      } catch (error) {

        localStorage.removeItem("token");
        setLoginData(null);
        setIsAuthLoading(false)
       
      }
    };
  
    const logout = () => {
      localStorage.removeItem("token");
      setLoginData(null);
     
    };
  
  
  
 
// const token = localStorage.getItem('token');
    const[status,setStatus]=useState([])
  const funGetStatus_Users = async () => {
    try {
      const res = await axiosInstance(USERS_URLS.COUNT);
     
      setStatus(res.data);
    } catch (error) {
      console.log('Error', error);
    }
  };
// Get Progress && ToDo && Done
let [infoo,setInfo]=useState([])
  const funGetStatus_info = async () => {
  
    try {
      const res = await axiosInstance(USERS_URLS.COUNT);
    
      setInfo(res.data);
    } catch (error) {
      console.log('Error', error);
    }
  };
      //  Get data  User info
      let [Userdata,setUserdata]=useState([])
      let funUserdata=async()=>{
        try {
          //// user url
          let res=await  axiosInstance(USERS_URLS.CURRENT)
      setUserdata(res.data)
     
  
        } catch (error) {
          console.log('Error in Getting Data',error)
        }
      }
      //  console.log(Userdata)
      // Effect
        useEffect(() => {
      if (localStorage.getItem("token")) {
        saveLoginData();
      }else{
        setIsAuthLoading(false)
      }
      funGetStatus_Users();
      funGetStatus_info();
      funUserdata()
    }, []);
    return (
      <AuthContext.Provider value={{ saveLoginData, loginData, logout,isAuthLoading,status,infoo,Userdata,funUserdata,funGetStatus_info,funGetStatus_Users}} >
        
        {children}

      </AuthContext.Provider>
    );
  }
