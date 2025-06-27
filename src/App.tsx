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
import ProjectList from "./modules/Projects/components/ProjecList/ProjectList";
import ProjectData from "./modules/Projects/components/ProjectData/ProjectData";
import Users from "./modules/Users/components/UsersList/UsersList";
import Protifolio from "./modules/Users/components/Protifolio";
import Changeinfo from "./modules/Users/components/UsersList/Changeinfo";
  
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContext";
import TasksBoard from "./modules/Tasks/components/TasksBoard/TasksBoard";
import TasksList from "./modules/Tasks/components/TasksList/TasksList";
import TasksData from "./modules/Tasks/components/TasksData/TasksData";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      children: [
        { path: "", element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Regestor /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "change-password", element: <ChangePass /> },
      ],
      errorElement: <NotFound />,
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Dashboard /> },
        { path: "/dashboard", element: <Dashboard /> },
        { path: "project-List", element: <ProjectList /> },
        { path: "project-Data", element: <ProjectData /> },
        { path: "tasks-board", element: <TasksBoard /> },
        { path: "tasks-list", element: <TasksList /> },
        { path: "tasks-data", element: <TasksData /> },
        { path: "users", element: <Users /> },
        { path: "protifolio", element: <Protifolio /> },
        { path: "changeinfo", element: <Changeinfo /> },
      ],
    },
  ]);

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={routes} />
      </AuthContextProvider>
      <ToastContainer />
    </>
  );
}

export default App;
