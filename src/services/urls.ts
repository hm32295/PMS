import axios from "axios";

const baseURL = 'https://upskilling-egypt.com:3003/api/v1';


export const axiosInstance = axios.create({
    baseURL,
    headers:{
        Authorization:  localStorage.getItem('token'),
       }
});


export const USERS_URLS = {
    RESET : `/Users/Reset/`,
    LOGIN : "/Users/Login/",
    FPRGET_PASSWORD : "/Users/Reset/Request/",
    CHANGE_PASSWORD : "/Users/ChangePassword/",
    REGISTER : "/Users/Register/",
    VERIFY :`/Users/verify`,
    GET_USERS: "/Users/",

}

export const PROJECTS_URLS ={
    GET : `/Project/`,
    CRETE : `/Project/`,
    DELETE :(id:string)=>`/Project/${id}`,
    UPDATE :(id:string)=>`/Project/${id}`,

}// 
// /api/v1/Project/{id}
// /api/v1/Task/manager
export const TASKS_URLS ={
    GET : '/Task/',
    GET_MANGER : '/Task/manager/',
    CREATE : '/Task/',
    UPDATE : (id:any)=>`/Task/${id}`,
    DELETE : (id:any)=>`/Task/${id}`,
}