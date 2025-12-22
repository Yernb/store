'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import AdminFurnitureManager from '@/components/admin/AdminFurnitureManager'
import AdminCategoryManager from '@/components/admin/AdminCategoryManager'
import AdminLogin from '@/components/admin/AdminLogin'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

type AdminTab = 'furniture' | 'categories'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('furniture')
  const [refreshKey, setRefreshKey] = useState(0)
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Handle OAuth callback - check for hash in URL
    const hash = window.location.hash
    if (hash && hash.includes('access_token')) {
      // OAuth callback detected, let Supabase handle it
      supabase.auth.getSession().then(() => {
        // Clear the hash from URL
        window.history.replaceState(null, '', '/admin')
      })
    }
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AdminLogin />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your furniture inventory and categories</p>
            </div>
            <div className="flex items-center gap-3">
              {/* User Info Badge */}
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="hidden sm:block">
                  <div className="text-xs text-gray-500">Signed in as</div>
                  <div className="text-sm font-semibold text-gray-900">{user.email}</div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <a
                  href="/"
                  className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                >
                  <span className="hidden sm:inline">← Back to Store</span>
                  <span className="sm:hidden">← Store</span>
                </a>
                <button
                  onClick={async () => {
                    await signOut()
                    router.push('/admin')
                  }}
                  className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => {
                setActiveTab('furniture')
                setRefreshKey(prev => prev + 1)
              }}
              className={`${
                activeTab === 'furniture'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Furniture Listings
            </button>
            <button
              onClick={() => {
                setActiveTab('categories')
                setRefreshKey(prev => prev + 1)
              }}
              className={`${
                activeTab === 'categories'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
            >
              Categories
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'furniture' && <AdminFurnitureManager key={refreshKey} />}
        {activeTab === 'categories' && <AdminCategoryManager key={refreshKey} />}
      </div>
    </div>
  )
}

