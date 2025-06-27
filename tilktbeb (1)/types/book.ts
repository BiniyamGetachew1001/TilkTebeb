// Define book type for Astewai digital book platform
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
  price?: number
  isPurchased?: boolean
  isFree?: boolean
  publisher?: string
  publishedDate?: string
  isbn?: string
  genre?: string
  tableOfContents?: string[]
}

// Type for book preview/card display
export interface BookPreview {
  id: string
  title: string
  author: string
  coverUrl: string
  category: string
  rating: number
  price?: number
  isPurchased?: boolean
  isFree?: boolean
}

// Type for book bundles/packs
export interface BookBundle {
  id: string
  title: string
  description: string
  coverUrl: string
  books: BookPreview[]
  originalPrice: number
  bundlePrice: number
  savings: number
  category: string
}

