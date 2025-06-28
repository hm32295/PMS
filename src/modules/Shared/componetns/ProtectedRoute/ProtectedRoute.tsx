import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';  
export default function ProtectedRoute(props: any) {
  const authContext = useContext(AuthContext);
   if (!authContext) return null;
  const { loginData, isAuthLoading }: any = authContext;
  if (isAuthLoading) {
    return <div className="text-center">Loading...</div>;
  }
  if (localStorage.getItem('token') || loginData) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}
