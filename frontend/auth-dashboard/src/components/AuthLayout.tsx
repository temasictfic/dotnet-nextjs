'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function AuthLayout({ 
  children,
  title,
  subtitle,
  showLoginLink = false,
  showRegisterLink = false,
}: { 
  children: React.ReactNode
  title: string
  subtitle: string
  showLoginLink?: boolean
  showRegisterLink?: boolean
}) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="auth-card">
        <h1 className="text-2xl font-bold mb-2 text-center">{title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">{subtitle}</p>
        
        {children}
        
        <div className="mt-6 text-center text-sm">
          {showLoginLink && (
            <p>
              Hesabın var mı?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Giriş Yap
              </Link>
            </p>
          )}
          
          {showRegisterLink && (
            <p>
              Hesabın yok mu?{' '}
              <Link href="/register" className="text-primary hover:underline">
                Kayıt Ol
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
