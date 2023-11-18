import axios from "axios";
import { User } from "../types/user/User";

export const API_URL = `http://localhost:3000/`;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await axios.get<User>(`${API_URL}/auth/refresh`, { withCredentials: true });
        return $api.request(originalRequest);
      } catch (e) {
        throw new Error(`Unauthorized`);
      }
    }
    throw error;
  }
);

export default $api;
