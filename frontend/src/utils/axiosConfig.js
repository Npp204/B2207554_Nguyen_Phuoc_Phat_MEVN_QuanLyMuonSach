import axios from 'axios'
import store from '@/store/store'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000 
})

api.interceptors.request.use(
  config => {
    const token = store.getters.getToken
    //console.log('Token gửi đi:', token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      store.dispatch('logout') 
      window.location.href = '/login-docgia' 
    }
    return Promise.reject(error)
  }
)

export default api
