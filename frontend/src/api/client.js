import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

client.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Ignore storage issues in restricted browser contexts.
  }

  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      try {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('profile');
      } catch {
        // Ignore storage issues in restricted browser contexts.
      }

      const role = localStorage.getItem('role');
      const loginPath = role === 'admin' ? '/admin/login' : '/login';
      if (window.location.pathname !== loginPath) {
        window.location.assign(loginPath);
      }
    }

    return Promise.reject(error);
  }
);

export default client;
