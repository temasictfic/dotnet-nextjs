'use client'

import AuthLayout from '@/components/AuthLayout'
import { useAuth } from '@/context/AuthContext'
import { useState, FormEvent } from 'react'

export default function RegisterPage() {
  const { register, isLoading } = useAuth()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await register({
      username,
      email,
      password,
      firstName,
      lastName
    })
  }

  return (
    <AuthLayout 
      title="Hesap Oluştur"
      subtitle="Yeni bir hesap oluşturarak başlayın"
      showLoginLink
    >
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="firstName">
              Ad
            </label>
            <input
              id="firstName"
              type="text"
              className="form-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="lastName">
              Soyad
            </label>
            <input
              id="lastName"
              type="text"
              className="form-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            Kullanıcı Adı
          </label>
          <input
            id="username"
            type="text"
            className="form-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            E-posta
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Şifre
          </label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button
          type="submit"
          className="btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
        </button>
      </form>
    </AuthLayout>
  )
}
