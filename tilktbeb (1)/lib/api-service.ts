import type { Book, BookPreview } from "@/types/book"
import type { BusinessPlan, BusinessPlanPreview } from "./mock-data"

// Configuration for Django API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'

// API service class for handling external Django API calls
export class ApiService {
  private static baseUrl = API_BASE_URL

  // Generic fetch wrapper with error handling
  private static async fetchWithErrorHandling<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error(`API call failed for ${endpoint}:`, error)
      throw error
    }
  }

  // Books API methods
  static async getBooks(params?: {
    category?: string
    query?: string
    premium?: boolean
    limit?: number
  }): Promise<BookPreview[]> {
    const searchParams = new URLSearchParams()
    
    if (params?.category) searchParams.append('category', params.category)
    if (params?.query) searchParams.append('query', params.query)
    if (params?.premium !== undefined) searchParams.append('premium', params.premium.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())

    const endpoint = `/books/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    return this.fetchWithErrorHandling<BookPreview[]>(endpoint)
  }

  static async getBookById(id: string): Promise<Book> {
    return this.fetchWithErrorHandling<Book>(`/books/${id}/`)
  }

  // Business Plans API methods
  static async getBusinessPlans(params?: {
    size?: string
    category?: string
    query?: string
    premium?: boolean
  }): Promise<BusinessPlanPreview[]> {
    const searchParams = new URLSearchParams()
    
    if (params?.size) searchParams.append('size', params.size)
    if (params?.category) searchParams.append('category', params.category)
    if (params?.query) searchParams.append('query', params.query)
    if (params?.premium !== undefined) searchParams.append('premium', params.premium.toString())

    const endpoint = `/business-plans/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    return this.fetchWithErrorHandling<BusinessPlanPreview[]>(endpoint)
  }

  static async getBusinessPlanById(id: string): Promise<BusinessPlan> {
    return this.fetchWithErrorHandling<BusinessPlan>(`/business-plans/${id}/`)
  }

  // Authentication API methods
  static async login(credentials: {
    email: string
    password: string
  }): Promise<{
    id: string
    firstName: string
    lastName: string
    email: string
    plan: string
    token?: string
  }> {
    return this.fetchWithErrorHandling('/auth/login/', {
      method: 'POST',
      body: JSON.stringify(credentials),
    })
  }

  static async register(userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }): Promise<{
    id: string
    firstName: string
    lastName: string
    email: string
    plan: string
    token?: string
  }> {
    return this.fetchWithErrorHandling('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  // User API methods
  static async getUserProfile(userId: string): Promise<{
    user: {
      id: string
      firstName: string
      lastName: string
      email: string
      plan: string
    }
    activities: Array<{
      id: string
      userId: string
      type: string
      itemId: string
      itemTitle: string
      timestamp: string
    }>
  }> {
    return this.fetchWithErrorHandling(`/user/${userId}/`)
  }

  static async updateUserProfile(userId: string, userData: {
    firstName?: string
    lastName?: string
    email?: string
  }): Promise<{
    id: string
    firstName: string
    lastName: string
    email: string
    plan: string
  }> {
    return this.fetchWithErrorHandling(`/user/${userId}/`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    })
  }

  // Payment API methods
  static async processPayment(paymentData: {
    userId: string
    amount: number
    plan: string
    paymentMethod: string
    paymentDetails: {
      phoneNumber?: string
      accountNumber?: string
      transactionId?: string
    }
  }): Promise<{
    success: boolean
    transactionId: string
    message: string
    timestamp: string
    plan: string
  }> {
    return this.fetchWithErrorHandling('/payments/', {
      method: 'POST',
      body: JSON.stringify(paymentData),
    })
  }

  static async verifyPayment(transactionId: string): Promise<{
    success: boolean
    status: string
    message: string
  }> {
    return this.fetchWithErrorHandling(`/payments/verify/${transactionId}/`)
  }

  static async getPaymentHistory(userId: string): Promise<Array<{
    success: boolean
    transactionId: string
    message: string
    timestamp: string
    plan: string
  }>> {
    return this.fetchWithErrorHandling(`/payments/?userId=${userId}`)
  }

  // Admin API methods (for admin dashboard)
  static async getAdminStats(): Promise<{
    totalUsers: number
    totalBooks: number
    totalBusinessPlans: number
    revenueThisMonth: number
  }> {
    return this.fetchWithErrorHandling('/admin/stats/')
  }

  static async getAdminUsers(params?: {
    page?: number
    limit?: number
    search?: string
  }): Promise<{
    users: Array<{
      id: string
      firstName: string
      lastName: string
      email: string
      plan: string
      createdAt: string
    }>
    total: number
    page: number
    totalPages: number
  }> {
    const searchParams = new URLSearchParams()
    
    if (params?.page) searchParams.append('page', params.page.toString())
    if (params?.limit) searchParams.append('limit', params.limit.toString())
    if (params?.search) searchParams.append('search', params.search)

    const endpoint = `/admin/users/${searchParams.toString() ? `?${searchParams.toString()}` : ''}`
    return this.fetchWithErrorHandling(endpoint)
  }

  // Bookmarks API methods
  static async getUserBookmarks(userId: string): Promise<BookPreview[]> {
    return this.fetchWithErrorHandling(`/user/${userId}/bookmarks/`)
  }

  static async addBookmark(userId: string, bookId: string): Promise<{ success: boolean }> {
    return this.fetchWithErrorHandling(`/user/${userId}/bookmarks/`, {
      method: 'POST',
      body: JSON.stringify({ bookId }),
    })
  }

  static async removeBookmark(userId: string, bookId: string): Promise<{ success: boolean }> {
    return this.fetchWithErrorHandling(`/user/${userId}/bookmarks/${bookId}/`, {
      method: 'DELETE',
    })
  }

  // Analytics API methods
  static async getUserAnalytics(userId: string): Promise<{
    readingStats: {
      booksRead: number
      totalReadingTime: number
      averageReadingSpeed: number
      streakDays: number
    }
    recentActivity: Array<{
      id: string
      type: string
      itemTitle: string
      timestamp: string
    }>
  }> {
    return this.fetchWithErrorHandling(`/user/${userId}/analytics/`)
  }
}
