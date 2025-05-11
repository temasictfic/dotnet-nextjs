import axios from 'axios'
import { getCookie } from 'cookies-next'

const API_URL = 'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor to include token in all requests
api.interceptors.request.use(
  (config) => {
    const token = getCookie('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Dashboard API requests
export const getDashboardStats = async () => {
  try {
    const response = await api.get('/dashboard/stats')
    return response.data
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    throw error
  }
}

export const getDashboardReports = async () => {
  try {
    const response = await api.get('/dashboard/reports')
    return response.data
  } catch (error) {
    console.error('Error fetching dashboard reports:', error)
    throw error
  }
}

// User API requests
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile')
    return response.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
}

export const updateUserProfile = async (userData: any) => {
  try {
    const response = await api.put('/users/profile', userData)
    return response.data
  } catch (error) {
    console.error('Error updating user profile:', error)
    throw error
  }
}

export const getAllUsers = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    console.error('Error fetching all users:', error)
    throw error
  }
}

export default api
