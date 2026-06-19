import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://createcards-cra6.onrender.com',
})

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const authAPI = {
  register: (data) => API.post('/api/auth/register', data),
  login: (data) => API.post('/api/auth/login', data),
  getMe: () => API.get('/api/auth/me'),
}

export const cardAPI = {
  getAll: () => API.get('/api/cards'),
  getOne: (id) => API.get(`/api/cards/${id}`),
  create: (data) => API.post('/api/cards', data),
  update: (id, data) => API.put(`/api/cards/${id}`, data),
  delete: (id) => API.delete(`/api/cards/${id}`),
}

export default API
