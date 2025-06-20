import axios from "axios";

const baseURL = 'https://upskilling-egypt.com:3003/api/v1';


export const axiosInstance = axios.create({
    baseURL,
    headers:{
        Authorization:  localStorage.getItem('token')
       }
});


export const USERS_URLS = {
    RESET : `/Users/Reset/`,
    LOGIN : "/Users/Login/",
    FPRGET_PASSWORD : "/Users/Reset/Request/",
    CHANGE_PASSWORD : "/Users/ChangePassword/",
    REGISTER : "/Users/Register/",
    VERIFY :`/Users/verify`,
}


