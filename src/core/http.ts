import axios from "axios";
import { storage } from "./storage";

export const api = axios.create({
  baseURL: "https://api.hellothematic.com",
  timeout: 20000,
});

api.interceptors.request.use(async (config) => {
  const token = await storage.getAuthToken(); 
  config.headers = config.headers ?? {};

  (config.headers as any)["Authorization"] = token ? `Bearer ${token}` : "";

 
  if (__DEV__) {
    const short = (token || "").slice(0, 6);
    console.log("[HTTP] Authorization:", short ? `Bearer ${short}…` : "(empty)");
  }

  return config;
});