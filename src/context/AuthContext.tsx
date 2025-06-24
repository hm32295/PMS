import { useEffect, useState, createContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext:any = createContext();
export default function AuthContextProvider({ children }) {
    const [loginData, setLoginData] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);
    const saveLoginData = () => {
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
  
    useEffect(() => {
      if (localStorage.getItem("token")) {
        saveLoginData();
      }else{
        setIsAuthLoading(false)
      }
    }, []);
  
    
    
    return (
      <AuthContext.Provider value={{ saveLoginData, loginData, logout,isAuthLoading}} >
        
        {children}

      </AuthContext.Provider>
    );
  }
