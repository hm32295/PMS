import axios from "axios";

const baseURL = 'https://upskilling-egypt.com:3003/api/v1';

export const axiosInstance = axios.create({
    baseURL,
    headers:{
        Authorization: localStorage.getItem('token'),
    }
});

// chat
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const USERS_URLS = {
    RESET : `/Users/Reset/`,
    LOGIN : "/Users/Login/",
    FPRGET_PASSWORD : "/Users/Reset/Request/",
    CHANGE_PASSWORD : "/Users/ChangePassword/",
    REGISTER : "/Users/Register/",
    VERIFY : `/Users/verify`,
    GET_USERS: "/Users/",
    UPDATE_USER_STATUS: (id: number | string) => `/Users/${id}`,
};

export const PROJECTS_URLS = {
    GET : `/Project/`,
    GET_MANAGER : `/Project/manager/`,
    GET_EMPLOYEE : `/Project/employee/`,
    CRETE : `/Project/`,
    DELETE : (id: string) => `/Project/${id}`,
    UPDATE : (id: string) => `/Project/${id}`,
};

// /api/v1/Task
// /api/v1/Task/{id}/change-status
export const TASKS_URLS = {
    GET : 'Task',
    GET_MANGER : '/Task/manager/',
    CREATE : '/Task/',
    UPDATE : (id: any) => `/Task/${id}`,
    DELETE : (id: any) => `/Task/${id}`,
    CHANGE_STATUS : (id: number) => `/Task/${id}/change-status`,
};
