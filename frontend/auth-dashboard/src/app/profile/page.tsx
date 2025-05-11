'use client'

import DashboardLayout from '@/components/DashboardLayout'
import { useAuth } from '@/context/AuthContext'
import { updateUserProfile } from '@/services/api'
import { useState, FormEvent } from 'react'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await updateUserProfile(formData)
      toast.success('Profil başarıyla güncellendi')
      setIsEditing(false)
    } catch (error) {
      toast.error('Profil güncellenirken bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <DashboardLayout>
      <div className="dashboard-card max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Profil Bilgileri</h2>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
            >
              Düzenle
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="firstName">
                  Ad
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2" htmlFor="lastName">
                  Soyad
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2" htmlFor="email">
                  E-posta
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
                disabled={loading}
              >
                {loading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md transition-colors"
                onClick={() => setIsEditing(false)}
                disabled={loading}
              >
                İptal
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Ad</h3>
                <p className="font-medium">{user.firstName}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Soyad</h3>
                <p className="font-medium">{user.lastName}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Kullanıcı Adı</h3>
                <p className="font-medium">{user.username}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">E-posta</h3>
                <p className="font-medium">{user.email}</p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Rol</h3>
                <p className="font-medium">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-xs">
                    {user.role}
                  </span>
                </p>
              </div>
              
              <div>
                <h3 className="text-sm text-gray-500 dark:text-gray-400">Kayıt Tarihi</h3>
                <p className="font-medium">
                  {new Date(user.createdAt).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
