import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/Shared/componetns/AuthLayout/AuthLayout";
import Login from "./modules/Authentiction/components/Login/Login";
import Regestor from "./modules/Authentiction/components/Regestor/Regestor";
import ForgetPass from "./modules/Authentiction/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/Authentiction/components/ResetPass/ResetPass";
import VerifyAccount from "./modules/Authentiction/components/VerifyAccount/VerifyAccount";
import ChangePass from "./modules/Authentiction/components/ChangePass/ChangePass";
import NotFound from "./modules/Shared/componetns/NotFound/NotFound";
import ProtectedRoute from "./modules/Shared/componetns/ProtectedRoute/ProtectedRoute";
import MasterLayout from "./modules/Shared/componetns/MasterLayout/MasterLayout";
import Dashboard from "./modules/Dashboard/components/Dashboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import ProjectList from "./modules/Projects/components/ProjecList/ProjectList";
import ProjectData from "./modules/Projects/components/ProjectData/ProjectData";
import Tasks from "./modules/Tasks/components/Tasks";
import Users from "./modules/Users/components/Users";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-bootstrap";


function App() {
  
   const routs= createBrowserRouter([
      {
         path: "",
         element: <AuthLayout /> , 
         children:[
           {
             path :"",
             element : <Login />
           },
           {
             path :"login",
             element : <Login  />
           },
           {
             path :"register",
             element : <Regestor />
           },
           {
             path :"forget-pass",
             element : <ForgetPass />
           },
           {
             path :"reset-pass",
             element : <ResetPass />
           },
           {
             path :"verify-account",
             element : <VerifyAccount />
           },
           {
             path :"change-password",
             element : <ChangePass />
           },
         ],
         errorElement : <NotFound />
       },
       {
         path : "/dashboard",
         element: <ProtectedRoute > <MasterLayout /> </ProtectedRoute> , 
         children :[
           { index : true, element : <Dashboard /> },
           { path : "Project-List", element : <ProjectList /> },
           { path : "Project-Data", element : <ProjectData /> },
           { path : "Tasks", element : <Tasks /> },
           { path : "Users", element : <Users /> },
         ]
       }
   ])
 return(
  
   <RouterProvider router={routs}>  
   </RouterProvider>
 );
}

export default App
