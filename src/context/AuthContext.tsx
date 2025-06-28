import { useEffect, useState, createContext } from "react";

import { jwtDecode } from "jwt-decode";
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
  
  
  
 
const token = localStorage.getItem('token');
    const[statuss,setstatuss]=useState([])
  const funGetStatus_Users = async () => {
    try {
      const res = await axios.get(
        'https://upskilling-egypt.com:3003/api/v1/Users/count',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
     
      setstatuss(res.data);
    } catch (error) {
      console.log('Error', error);
    }
  };
// Get Progress && ToDo && Done
let [infoo,setinfoo]=useState([])
  const funGetStatus_info = async () => {
  
    try {
      const res = await axios.get(
        'https://upskilling-egypt.com:3003/api/v1/Task/count',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    
      setinfoo(res.data);
    } catch (error) {
      console.log('Error', error);
    }
  };
      //  Get data  User info
      let [Userdata,setUserdata]=useState([])
      let funUserdata=async()=>{
        try {
          let res=await  axios.get('https://upskilling-egypt.com:3003/api/v1/Users/currentUser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        )
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
      <AuthContext.Provider value={{ saveLoginData, loginData, logout,isAuthLoading,statuss,infoo,Userdata,funUserdata,funGetStatus_info,funGetStatus_Users}} >
        
        {children}

      </AuthContext.Provider>
    );
  }
