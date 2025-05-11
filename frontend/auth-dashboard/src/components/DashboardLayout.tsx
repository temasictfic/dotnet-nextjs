'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import { 
  HomeIcon, 
  UserIcon, 
  ChartPieIcon, 
  DocumentTextIcon,
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

export default function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const { user, isLoading, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  // Protect route - redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        
        <div className="mt-4">
          <nav>
            <Link 
              href="/dashboard" 
              className={`sidebar-link flex items-center ${pathname === '/dashboard' ? 'active' : ''}`}
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Dashboard
            </Link>
            
            <Link 
              href="/profile" 
              className={`sidebar-link flex items-center ${pathname === '/profile' ? 'active' : ''}`}
            >
              <UserIcon className="h-5 w-5 mr-2" />
              Profil
            </Link>
            
            <div className="px-4 py-2 text-sm text-gray-400 mt-6 mb-2">
              Raporlar
            </div>
            
            <Link 
              href="/dashboard/analytics" 
              className={`sidebar-link flex items-center ${pathname?.includes('/dashboard/analytics') ? 'active' : ''}`}
            >
              <ChartPieIcon className="h-5 w-5 mr-2" />
              Analitik
            </Link>
            
            <Link 
              href="/dashboard/reports" 
              className={`sidebar-link flex items-center ${pathname?.includes('/dashboard/reports') ? 'active' : ''}`}
            >
              <DocumentTextIcon className="h-5 w-5 mr-2" />
              Raporlar
            </Link>
            
            <div className="px-4 py-2 text-sm text-gray-400 mt-6 mb-2">
              Ayarlar
            </div>
            
            <Link 
              href="/profile/settings" 
              className={`sidebar-link flex items-center ${pathname === '/profile/settings' ? 'active' : ''}`}
            >
              <Cog6ToothIcon className="h-5 w-5 mr-2" />
              Hesap Ayarları
            </Link>
            
            <button 
              onClick={logout}
              className="sidebar-link flex items-center w-full text-left text-red-400 hover:text-red-300 mt-8"
            >
              <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" />
              Çıkış Yap
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{getPageTitle(pathname)}</h1>
          
          <div className="flex items-center">
            <span className="text-sm mr-2">
              Merhaba, <strong>{user.firstName} {user.lastName}</strong>
            </span>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
              {user.firstName[0]}
            </div>
          </div>
        </div>
        
        {children}
      </main>
    </div>
  )
}

// Helper function to get page title based on pathname
function getPageTitle(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard'
  if (pathname === '/profile') return 'Profil'
  if (pathname === '/dashboard/analytics') return 'Analitik'
  if (pathname === '/dashboard/reports') return 'Raporlar'
  if (pathname === '/profile/settings') return 'Hesap Ayarları'
  
  return 'Dashboard'
}
