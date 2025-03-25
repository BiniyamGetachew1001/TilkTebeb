// Define book type without audio and progress tracking properties
export interface Book {
  id: string
  title: string
  author: string
  coverUrl: string
  category: string
  rating: number
  pages: number
  language: string
  summary: string
  keyInsights?: string
  applications?: string
  isPremium?: boolean
}

// Type for book preview/card display
export interface BookPreview {
  id: string
  title: string
  author: string
  coverUrl: string
  category: string
  rating: number
}

