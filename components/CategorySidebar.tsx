'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getCategoriesWithSubcategories } from '@/lib/adminData'
import { CategoryWithSubcategories } from '@/lib/adminData'

interface CategorySidebarProps {
  isOpen: boolean
  onClose: () => void
  isCollapsed?: boolean
  onToggleCollapse?: () => void
}

export default function CategorySidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse }: CategorySidebarProps) {
  const [categories, setCategories] = useState<CategoryWithSubcategories[]>([])
  const pathname = usePathname()

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategoriesWithSubcategories()
        setCategories(cats)
      } catch (error) {
        console.error('Error loading categories:', error)
      }
    }
    loadCategories()
  }, [])


  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-50
          transform transition-all duration-300 ease-in-out
          overflow-y-auto shadow-lg lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-0 lg:border-r-0 lg:overflow-hidden' : 'lg:w-80'}
          w-80
        `}
      >
        <div className={`p-6 ${isCollapsed ? 'lg:p-3' : ''}`}>
          {/* Mobile header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-xl font-bold text-gray-900">Categories</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Desktop header */}
          <div className={`hidden lg:block ${isCollapsed ? 'mb-4' : 'mb-6'}`}>
            <div className="flex items-center justify-between">
              {!isCollapsed && <h2 className="text-xl font-bold text-gray-900">Categories</h2>}
              {onToggleCollapse && (
                <button
                  onClick={onToggleCollapse}
                  className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${isCollapsed ? 'mx-auto' : 'ml-auto'}`}
                  aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                >
                  <svg
                    className={`w-5 h-5 transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
              )}
            </div>
            {!isCollapsed && (
              <p className="text-sm text-gray-600 mt-1">Browse by category</p>
            )}
          </div>

          {/* Categories list */}
          <nav className="space-y-1">
            {categories.map((category) => {
              const isActive = pathname === `/category/${encodeURIComponent(category.name)}`

              return (
                <div key={category.id} className="mb-1">
                  <Link
                    href={`/category/${encodeURIComponent(category.name)}`}
                    onClick={handleLinkClick}
                    className={`
                      flex items-center rounded-lg text-sm font-medium transition-colors
                      ${isCollapsed ? 'px-3 py-2.5 justify-center' : 'px-4 py-2.5'}
                      ${isActive
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                    title={isCollapsed ? category.name : undefined}
                  >
                    {isCollapsed ? (
                      <span className="text-lg font-bold">{category.name.charAt(0)}</span>
                    ) : (
                      category.name
                    )}
                  </Link>
                </div>
              )
            })}
          </nav>

          {/* All Categories link */}
          {!isCollapsed && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <Link
                href="/furniture"
                onClick={handleLinkClick}
                className={`
                  block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${pathname === '/furniture'
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                View All Categories
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

