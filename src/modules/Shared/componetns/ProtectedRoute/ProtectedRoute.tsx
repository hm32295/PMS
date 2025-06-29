import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';  
export default function ProtectedRoute({ children, allowedRoles }: any) {
  const authContext = useContext(AuthContext);
   if (!authContext) return null;
  const { loginData, isAuthLoading }: any = authContext;
  if (isAuthLoading) {
    return <div className="text-center">Loading...</div>;
  }


  if (!loginData && !localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }
  if (allowedRoles && !allowedRoles.includes(loginData?.userGroup) ) {
    return <Navigate to="/dashboard" />;
  }

  return children;


  // if (localStorage.getItem('token') || loginData) {
  //   return children;
  // } else {
  //   return <Navigate to="/" />;
  // }
}
// export default function ProtectedRoute({ children, allowedRoles }: Props) {

  
// }