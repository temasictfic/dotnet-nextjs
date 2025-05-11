'use client'

import DashboardLayout from '@/components/DashboardLayout'
import StatCard from '@/components/StatCard'
import { getDashboardStats } from '@/services/api'
import { useEffect, useState } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { 
  UsersIcon, 
  UserCircleIcon, 
  UserPlusIcon, 
  CurrencyDollarIcon 
} from '@heroicons/react/24/outline'

interface DashboardStats {
  totalUsers: number
  activeUsers: number
  newUsers: number
  totalSales: number
  metrics: Array<{
    Month: string
    Value: number
  }>
  recentActivities: Array<{
    user: string
    action: string
    date: string
  }>
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error('Error fetching dashboard stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : stats ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              value={stats.totalUsers} 
              label="Toplam Kullanıcı" 
              icon={<UsersIcon className="h-8 w-8" />} 
            />
            <StatCard 
              value={stats.activeUsers} 
              label="Aktif Kullanıcı" 
              icon={<UserCircleIcon className="h-8 w-8" />} 
            />
            <StatCard 
              value={stats.newUsers} 
              label="Yeni Kullanıcı" 
              icon={<UserPlusIcon className="h-8 w-8" />} 
            />
            <StatCard 
              value={`₺${stats.totalSales.toLocaleString()}`} 
              label="Toplam Satış" 
              icon={<CurrencyDollarIcon className="h-8 w-8" />} 
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 dashboard-card">
              <h2 className="text-xl font-semibold mb-4">Aylık Metrikler</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={stats.metrics}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="Value" 
                      stroke="#3B82F6" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="dashboard-card">
              <h2 className="text-xl font-semibold mb-4">Son Aktiviteler</h2>
              <div className="space-y-4">
                {stats.recentActivities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="border-b last:border-b-0 pb-3 last:pb-0"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(activity.date).toLocaleString('tr-TR', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {activity.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Veri yüklenirken bir hata oluştu.</p>
      )}
    </DashboardLayout>
  )
}
