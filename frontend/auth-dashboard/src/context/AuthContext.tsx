'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { getCookie, setCookie, deleteCookie } from 'cookies-next'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (username: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check for token in cookies on initial load
    const storedToken = getCookie('token') as string | undefined
    
    if (storedToken) {
      setToken(storedToken)
      // Set axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`
      
      // Get user profile
      fetchUserProfile()
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile')
      setUser(response.data)
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      // If token is invalid, clear auth state
      logout()
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      })

      const { token, ...userData } = response.data
      setToken(token)
      setUser(userData)
      
      // Store token in cookies
      setCookie('token', token, { maxAge: 60 * 60 * 3 }) // 3 hours
      
      // Set default Authorization header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      toast.success('Giriş başarılı!')
      router.push('/dashboard')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Giriş yapılırken bir hata oluştu'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData)

      const { token, ...userInfo } = response.data
      setToken(token)
      setUser(userInfo)
      
      // Store token in cookies
      setCookie('token', token, { maxAge: 60 * 60 * 3 }) // 3 hours
      
      // Set default Authorization header for all requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      
      toast.success('Kayıt başarılı!')
      router.push('/dashboard')
    } catch (error: any) {
      const message = error.response?.data?.message || 'Kayıt olurken bir hata oluştu'
      toast.error(message)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    deleteCookie('token')
    delete axios.defaults.headers.common['Authorization']
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
