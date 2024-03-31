import axios from "axios";
var clientId = "419f99d845da4e6180b795dc9e3d2ab0";
var clientSecret = "2c3902e16462472dbf3bf1e056705857";
var baseUrl = "https://api.spotify.com/v1";

const $api = axios.create({
  baseURL: baseUrl,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    console.log("$api -> interceptors -> reponse -> success", config.data);
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        console.warn("Token updating...");
        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          { grant_type: "client_credentials" },
          {
            headers: { Authorization: "Basic " + btoa(clientId + ":" + clientSecret), "Content-Type": "application/x-www-form-urlencoded" },
          }
        );
        localStorage.setItem("token", response.data.access_token);
        return $api.request(originalRequest);
      } catch (error) {
        console.log("$api -> interceptors -> error", error);
      }
    }
    console.warn("api -> interceptors -> response -> error", error.code, error.response.status, error.response.data.error);
  }
);

export default $api;
