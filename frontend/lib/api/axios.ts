import axios from "axios";
import { Router } from "next/router";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

instance.interceptors.request.use(function (config) {
  config.withCredentials = true;
  return config;
});

export default instance;
