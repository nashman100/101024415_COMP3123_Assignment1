import axios from 'axios';

const API = axios.create({
  baseURL: 'https://101024415-comp-3123-assignment1.vercel.app/api/v1',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;