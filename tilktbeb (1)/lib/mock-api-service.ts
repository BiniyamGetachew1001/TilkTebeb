import type { Book, BookPreview } from "@/types/book"
import type { BusinessPlan, BusinessPlanPreview } from "./mock-data"
import type { BlogPost } from "./blog-data"
import {
  mockBooks,
  mockBookPreviews,
  mockBusinessPlans,
  mockBusinessPlanPreviews
} from "./mock-data"
import { mockBlogPosts } from "./blog-data"

// Mock API service for development when Django backend is not available
export class MockApiService {
  // Simulate network delay
  private static delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Books API methods
  static async getBooks(params?: {
    category?: string
    query?: string
    premium?: boolean
    limit?: number
  }): Promise<BookPreview[]> {
    await this.delay()
    
    let filteredBooks = [...mockBookPreviews]

    if (params?.category && params.category !== "all") {
      filteredBooks = filteredBooks.filter(
        book => book.category.toLowerCase() === params.category!.toLowerCase()
      )
    }

    if (params?.query) {
      const searchQuery = params.query.toLowerCase()
      filteredBooks = filteredBooks.filter(
        book => 
          book.title.toLowerCase().includes(searchQuery) || 
          book.author.toLowerCase().includes(searchQuery)
      )
    }

    if (params?.premium !== undefined) {
      const fullBooks = mockBooks.filter(book => book.isPremium === params.premium)
      const premiumBookIds = fullBooks.map(book => book.id)
      filteredBooks = filteredBooks.filter(book => premiumBookIds.includes(book.id))
    }

    if (params?.limit) {
      filteredBooks = filteredBooks.slice(0, params.limit)
    }

    return filteredBooks
  }

  static async getBookById(id: string): Promise<Book> {
    await this.delay()
    
    const book = mockBooks.find(book => book.id === id)
    if (!book) {
      throw new Error(`Book with id ${id} not found`)
    }
    
    return book
  }

  // Free Books API methods
  static async getFreeBooks(params?: {
    category?: string
    query?: string
    sortBy?: "title" | "rating" | "author"
    limit?: number
  }): Promise<BookPreview[]> {
    await this.delay()

    let freeBooks = mockBookPreviews.filter(book => {
      const fullBook = mockBooks.find(b => b.id === book.id)
      return fullBook?.isFree || fullBook?.price === 0
    })

    if (params?.category && params.category !== "All") {
      freeBooks = freeBooks.filter(
        book => book.category.toLowerCase() === params.category!.toLowerCase()
      )
    }

    if (params?.query) {
      const searchQuery = params.query.toLowerCase()
      freeBooks = freeBooks.filter(
        book =>
          book.title.toLowerCase().includes(searchQuery) ||
          book.author.toLowerCase().includes(searchQuery) ||
          book.category.toLowerCase().includes(searchQuery)
      )
    }

    if (params?.sortBy) {
      freeBooks.sort((a, b) => {
        switch (params.sortBy) {
          case "rating":
            return b.rating - a.rating
          case "author":
            return a.author.localeCompare(b.author)
          case "title":
          default:
            return a.title.localeCompare(b.title)
        }
      })
    }

    if (params?.limit) {
      freeBooks = freeBooks.slice(0, params.limit)
    }

    return freeBooks
  }

  // Blog API methods
  static async getBlogPosts(params?: {
    category?: string
    query?: string
    limit?: number
  }): Promise<BlogPost[]> {
    await this.delay()

    let filteredPosts = [...mockBlogPosts]

    if (params?.category && params.category !== "All") {
      filteredPosts = filteredPosts.filter(
        post => post.category.toLowerCase() === params.category!.toLowerCase()
      )
    }

    if (params?.query) {
      const searchQuery = params.query.toLowerCase()
      filteredPosts = filteredPosts.filter(
        post =>
          post.title.toLowerCase().includes(searchQuery) ||
          post.excerpt.toLowerCase().includes(searchQuery) ||
          post.author.toLowerCase().includes(searchQuery)
      )
    }

    if (params?.limit) {
      filteredPosts = filteredPosts.slice(0, params.limit)
    }

    return filteredPosts
  }

  static async getBlogPostBySlug(slug: string): Promise<BlogPost> {
    await this.delay()

    const post = mockBlogPosts.find(post => post.slug === slug)
    if (!post) {
      throw new Error(`Blog post with slug ${slug} not found`)
    }

    return post
  }

  static async getRelatedBlogPosts(currentSlug: string, limit: number = 3): Promise<BlogPost[]> {
    await this.delay()

    const currentPost = mockBlogPosts.find(post => post.slug === currentSlug)
    if (!currentPost) return []

    return mockBlogPosts
      .filter(post => post.slug !== currentSlug && post.category === currentPost.category)
      .slice(0, limit)
  }

  // Business Plans API methods
  static async getBusinessPlans(params?: {
    size?: string
    category?: string
    query?: string
    premium?: boolean
  }): Promise<BusinessPlanPreview[]> {
    await this.delay()
    
    let filteredPlans = [...mockBusinessPlanPreviews]

    if (params?.size && params.size !== "all") {
      filteredPlans = filteredPlans.filter(plan => plan.size === params.size)
    }

    if (params?.category && params.category !== "all") {
      filteredPlans = filteredPlans.filter(
        plan => plan.category.toLowerCase() === params.category!.toLowerCase()
      )
    }

    if (params?.query) {
      const searchQuery = params.query.toLowerCase()
      filteredPlans = filteredPlans.filter(
        plan => 
          plan.title.toLowerCase().includes(searchQuery) || 
          plan.category.toLowerCase().includes(searchQuery)
      )
    }

    if (params?.premium !== undefined) {
      filteredPlans = filteredPlans.filter(plan => plan.isPremium === params.premium)
    }

    return filteredPlans
  }

  static async getBusinessPlanById(id: string): Promise<BusinessPlan> {
    await this.delay()
    
    const plan = mockBusinessPlans.find(plan => plan.id === id)
    if (!plan) {
      throw new Error(`Business plan with id ${id} not found`)
    }
    
    return plan
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
    await this.delay()
    
    // Mock successful login for demo purposes
    return {
      id: "user-1",
      firstName: "John",
      lastName: "Doe",
      email: credentials.email,
      plan: "medium",
      token: "mock-jwt-token-123"
    }
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
    await this.delay()
    
    // Mock successful registration
    return {
      id: `user-${Date.now()}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      plan: "base",
      token: "mock-jwt-token-456"
    }
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
    await this.delay()
    
    return {
      user: {
        id: userId,
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        plan: "medium"
      },
      activities: [
        {
          id: "activity-1",
          userId: userId,
          type: "book_read",
          itemId: "the-psychology-of-money",
          itemTitle: "The Psychology of Money",
          timestamp: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: "activity-2",
          userId: userId,
          type: "plan_viewed",
          itemId: "small-1",
          itemTitle: "Local Coffee Shop",
          timestamp: new Date(Date.now() - 172800000).toISOString()
        }
      ]
    }
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
    await this.delay()
    
    return {
      id: userId,
      firstName: userData.firstName || "John",
      lastName: userData.lastName || "Doe",
      email: userData.email || "john.doe@example.com",
      plan: "medium"
    }
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
    await this.delay(1000) // Longer delay for payment processing
    
    // Mock successful payment
    return {
      success: true,
      transactionId: `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      message: "Payment processed successfully",
      timestamp: new Date().toISOString(),
      plan: paymentData.plan
    }
  }

  static async verifyPayment(transactionId: string): Promise<{
    success: boolean
    status: string
    message: string
  }> {
    await this.delay()
    
    return {
      success: true,
      status: "completed",
      message: "Payment verified successfully"
    }
  }

  static async getPaymentHistory(userId: string): Promise<Array<{
    success: boolean
    transactionId: string
    message: string
    timestamp: string
    plan: string
  }>> {
    await this.delay()
    
    return [
      {
        success: true,
        transactionId: "TRX-123456789",
        message: "Payment processed successfully",
        timestamp: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
        plan: "medium"
      }
    ]
  }

  // Admin API methods
  static async getAdminStats(): Promise<{
    totalUsers: number
    totalBooks: number
    totalBusinessPlans: number
    revenueThisMonth: number
  }> {
    await this.delay()
    
    return {
      totalUsers: 1250,
      totalBooks: mockBooks.length,
      totalBusinessPlans: mockBusinessPlans.length,
      revenueThisMonth: 15750
    }
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
    await this.delay()
    
    const mockUsers = [
      {
        id: "user-1",
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        plan: "medium",
        createdAt: "2023-01-15T00:00:00Z"
      },
      {
        id: "user-2",
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@example.com",
        plan: "base",
        createdAt: "2023-03-22T00:00:00Z"
      }
    ]

    return {
      users: mockUsers,
      total: mockUsers.length,
      page: params?.page || 1,
      totalPages: 1
    }
  }

  // Bookmarks API methods
  static async getUserBookmarks(userId: string): Promise<BookPreview[]> {
    await this.delay()
    
    // Return first 2 books as bookmarked for demo
    return mockBookPreviews.slice(0, 2)
  }

  static async addBookmark(userId: string, bookId: string): Promise<{ success: boolean }> {
    await this.delay()
    
    return { success: true }
  }

  static async removeBookmark(userId: string, bookId: string): Promise<{ success: boolean }> {
    await this.delay()
    
    return { success: true }
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
    await this.delay()
    
    return {
      readingStats: {
        booksRead: 12,
        totalReadingTime: 2400, // minutes
        averageReadingSpeed: 250, // words per minute
        streakDays: 7
      },
      recentActivity: [
        {
          id: "activity-1",
          type: "book_read",
          itemTitle: "The Psychology of Money",
          timestamp: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: "activity-2",
          type: "plan_viewed",
          itemTitle: "Local Coffee Shop",
          timestamp: new Date(Date.now() - 172800000).toISOString()
        }
      ]
    }
  }
}
