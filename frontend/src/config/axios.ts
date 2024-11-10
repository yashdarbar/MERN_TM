import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// Create axios instance
const api = axios.create({
    baseURL: "http://localhost:5000", // adjust this to match your API URL
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");

        if (token) {
            // Ensure headers object exists
            config.headers = config.headers || {};

            // Add token to Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config;

        // Handle 401 errors
        if (error.response?.status === 401) {
            // Get stored token
            const token = localStorage.getItem("token");

            // If there's no token, or the request already has a token and still failed,
            // clear auth and redirect to login
            if (!token || error.config?.headers?.Authorization) {
                localStorage.removeItem("token");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
// import axios from "axios";

// const api = axios.create({
//     baseURL: "http://localhost:5000",
//     headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//     },
//     withCredentials: true, // Important for cookies if you're using sessions
// });

// export default api;
