import axios from 'axios'
const axiosClient = axios.create({
    baseURL: 'http://localhost:5044/api/',
    
});
axiosClient.interceptors.request.use(async function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.error('Unauthorized - Token may be invalid or expired.');
        }
        return Promise.reject(error);
    }
);
export default axiosClient;
