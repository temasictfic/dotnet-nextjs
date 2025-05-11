'use client'

import { ReactNode } from 'react'

interface StatCardProps {
  value: string | number
  label: string
  icon: ReactNode
  className?: string
}

export default function StatCard({ value, label, icon, className = '' }: StatCardProps) {
  return (
    <div className={`dashboard-card flex items-center ${className}`}>
      <div className="mr-4 h-12 w-12 text-gray-500 dark:text-gray-400 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="stat-value">{value}</p>
        <p className="stat-label">{label}</p>
      </div>
    </div>
  )
}
