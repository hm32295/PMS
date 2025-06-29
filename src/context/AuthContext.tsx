import { useEffect, useState, createContext } from "react";

import { jwtDecode } from "jwt-decode";
import { axiosInstance, USERS_URLS, USERS_URLS_info } from "../services/urls";
import axios from "axios";

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
  
    const[status,setStatus]=useState([])
  const funGetStatus_Users = async () => {
    try {
  const res = await axios.get(
  'https://upskilling-egypt.com:3003/api/v1/Users/count',
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
     
  setStatus(res.data);
       console.log('raw response:', res.data);
      console.log('keys:', Object.keys(res.data));
     
    } catch (error) {
      console.log('Error', error);
    }
  };
// Get Progress && ToDo && Done
let [infoo,setInfo]=useState([])
  const funGetStatus_info = async () => {

    try {
      const res = await axios.get('https://upskilling-egypt.com:3003/api/v1/Task/count', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      )
      setInfo(res.data);
     

    } catch (error) {
      console.log('Error', error);
    }
  };
      //  Get data  User info
      let [Userdata,setUserdata]=useState([])
      let funUserdata=async()=>{
        try {
         
          let res=await  axiosInstance(USERS_URLS.CURRENT)
          setUserdata(res.data)
     
        } catch (error) {
          console.log('Error in Getting Data',error)
        }
      }
     
  useEffect(() => {
  const init = async () => {
  
    if (localStorage.getItem("token")) {
      await saveLoginData();              // يفكّ التوكن ويخزن الداتا
      await funGetStatus_Users();         // يجيب عدّ المستخدمين
      await funGetStatus_info();          // يجيب عدّ المهام
      await funUserdata();                // يجيب بيانات المستخدم
    }
    setIsAuthLoading(false);              // يطفي الـ loader
  };
  init();
}, []);

   
     
    return (
      <AuthContext.Provider value={{ saveLoginData, loginData, logout,isAuthLoading,status,infoo,Userdata,funUserdata,funGetStatus_info,funGetStatus_Users}} >
        
        {children}

      </AuthContext.Provider>
    );
  }
