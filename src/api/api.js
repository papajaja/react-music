import axios from "axios";
const baseUrl = "https://api.spotify.com/v1";

const $api = axios.create({
  baseURL: baseUrl,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    console.warn(
      "api -> interceptors -> response -> error",
      error.code,
      error.response.status,
      error.response.data.error
    );
    const originalRequest = error.config;
    if (error.response.status === 401) {
      try {
        console.warn("Token updating...");

        const grant_type = "refresh_token";
        const refresh_token = localStorage.getItem("refresh_token");

        const response = await axios.post(
          "https://accounts.spotify.com/api/token",
          {
            grant_type: grant_type,
            refresh_token: refresh_token,
            client_id: "419f99d845da4e6180b795dc9e3d2ab0",
          },
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        const access = response.data.access_token;
        const refresh = response.data.refresh_token;

        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        // console.log(access, refresh);
        return $api.request(originalRequest);
      } catch (error) {
        console.log("$api -> interceptors -> error", error);
      }
    }
  }
);

export default $api;
