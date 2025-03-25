export interface BusinessPlan {
  id: string
  title: string
  description: string
  size: "small" | "medium" | "large"
  industry: string
  coverImage?: string
  price: number
  createdAt: string
  updatedAt: string
  categories?: string[]
  author?: string
  downloadCount?: number
  rating?: number
}

