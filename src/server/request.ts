import axios from "axios";

export const request = axios.create({
  baseURL: "https://ap-vodiy-parfum-backend.up.railway.app/api/v1",
  timeout: 10000,
});

request.interceptors.response.use(
  async (response) => {
    return response;
  },
  (err) => {
    console.log(err);
    
    return Promise.reject(err);
  }
);
