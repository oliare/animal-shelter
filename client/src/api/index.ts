import axios from "axios";
export const API_URL = import.meta.env.VITE_API_URL;

export const http_service = axios.create({
   baseURL: API_URL,
   headers: {
       "Content-Type": "application/json"
   }
});