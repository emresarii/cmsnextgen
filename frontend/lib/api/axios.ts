import axios from "axios";
import { Router } from "next/router";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  if (config.headers)
    config.headers.Authorization = token ? `Bearer ${token}` : "";

  return config;
});

instance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status == "401")
  {
    localStorage.removeItem("token");
    window.location.href="/"
  }
  return Promise.reject(error);
});
export default instance;
