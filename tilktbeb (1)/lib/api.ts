import { useState, useEffect } from 'react'
import { ApiService } from './api-service'
import { MockApiService } from './mock-api-service'

// Environment configuration
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true' || 
                    process.env.NODE_ENV === 'development'

// Export the appropriate service based on environment
export const api = USE_MOCK_API ? MockApiService : ApiService

// Re-export types for convenience
export type { Book, BookPreview } from '@/types/book'
export type { BusinessPlan, BusinessPlanPreview } from './mock-data'

// Utility function to check if we're using mock API
export const isUsingMockApi = () => USE_MOCK_API

// Helper function for error handling in components
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unexpected error occurred'
}

// Configuration constants
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  USE_MOCK: USE_MOCK_API,
}

// Authentication token management
export const authTokenManager = {
  getToken: (): string | null => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
  },
  
  setToken: (token: string): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem('auth_token', token)
  },
  
  removeToken: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('auth_token')
  },
  
  isAuthenticated: (): boolean => {
    return !!authTokenManager.getToken()
  }
}

// User session management
export const userSessionManager = {
  getCurrentUser: (): {
    id: string
    firstName: string
    lastName: string
    email: string
    plan: string
  } | null => {
    if (typeof window === 'undefined') return null
    const userStr = localStorage.getItem('current_user')
    return userStr ? JSON.parse(userStr) : null
  },
  
  setCurrentUser: (user: {
    id: string
    firstName: string
    lastName: string
    email: string
    plan: string
  }): void => {
    if (typeof window === 'undefined') return
    localStorage.setItem('current_user', JSON.stringify(user))
  },
  
  removeCurrentUser: (): void => {
    if (typeof window === 'undefined') return
    localStorage.removeItem('current_user')
  },
  
  logout: (): void => {
    authTokenManager.removeToken()
    userSessionManager.removeCurrentUser()
  }
}

// API response types for better type safety
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  results: T[]
  count: number
  next: string | null
  previous: string | null
  page: number
  totalPages: number
}

// Common API parameters
export interface BookFilters {
  category?: string
  query?: string
  premium?: boolean
  limit?: number
}

export interface BusinessPlanFilters {
  size?: string
  category?: string
  query?: string
  premium?: boolean
}

export interface UserFilters {
  page?: number
  limit?: number
  search?: string
}

// Payment types
export interface PaymentRequest {
  userId: string
  amount: number
  plan: string
  paymentMethod: 'telebirr' | 'cbe'
  paymentDetails: {
    phoneNumber?: string
    accountNumber?: string
    transactionId?: string
  }
}

export interface PaymentResponse {
  success: boolean
  transactionId: string
  message: string
  timestamp: string
  plan: string
}

// User types
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  plan: 'base' | 'small' | 'medium' | 'large'
  createdAt?: string
}

export interface UserActivity {
  id: string
  userId: string
  type: 'book_read' | 'plan_viewed' | 'book_saved'
  itemId: string
  itemTitle: string
  timestamp: string
}

export interface UserProfile {
  user: User
  activities: UserActivity[]
}

// Analytics types
export interface ReadingStats {
  booksRead: number
  totalReadingTime: number
  averageReadingSpeed: number
  streakDays: number
}

export interface UserAnalytics {
  readingStats: ReadingStats
  recentActivity: Array<{
    id: string
    type: string
    itemTitle: string
    timestamp: string
  }>
}

// Admin types
export interface AdminStats {
  totalUsers: number
  totalBooks: number
  totalBusinessPlans: number
  revenueThisMonth: number
}

// Error types
export interface ApiError {
  message: string
  status?: number
  code?: string
}

// Custom hook for API calls with loading and error states
export const useApiCall = <T>(
  apiCall: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await apiCall()
      setData(result)
    } catch (err) {
      setError(handleApiError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, dependencies)

  return { data, loading, error, refetch: fetchData }
}
