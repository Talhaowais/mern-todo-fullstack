import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // your backend
  withCredentials: true, // important to send cookie for session
});

export default api;