// Analytics utility functions for tracking user behavior and generating insights

import type { Book } from "@/types/book"
import type { BusinessPlan } from "@/types/business-plan"

// Types for analytics data
export interface UserActivity {
  userId: string
  timestamp: string
  action: "view" | "read" | "bookmark" | "download" | "complete" | "quiz_attempt" | "flashcard_create" | "note_create"
  contentId: string
  contentType: "book" | "businessPlan"
  metadata?: Record<string, any>
}

export interface ReadingStats {
  totalTimeSpent: number // in minutes
  booksStarted: number
  booksCompleted: number
  businessPlansViewed: number
  averageReadingSpeed: number // words per minute
  topCategories: Array<{ category: string; count: number }>
  readingStreak: number // consecutive days
  lastReadAt: string
}

export interface RecommendationScore {
  contentId: string
  score: number
  reasons: string[]
}

// Track user activity
export async function trackUserActivity(
  userId: string,
  action: UserActivity["action"],
  contentId: string,
  contentType: UserActivity["contentType"],
  metadata?: Record<string, any>,
): Promise<void> {
  try {
    // In a production app, this would be sent to an analytics service
    // For now, we'll store it in localStorage for demo purposes
    const activity: UserActivity = {
      userId,
      timestamp: new Date().toISOString(),
      action,
      contentId,
      contentType,
      metadata,
    }

    // Get existing activities
    const storedActivities = localStorage.getItem(`user-activities-${userId}`) || "[]"
    const activities: UserActivity[] = JSON.parse(storedActivities)

    // Add new activity
    activities.push(activity)

    // Store back to localStorage
    localStorage.setItem(`user-activities-${userId}`, JSON.stringify(activities))

    // In a real app, we would also send this to the server
    // await fetch('/api/analytics/track', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(activity)
    // })

    console.log("Activity tracked:", activity)
  } catch (error) {
    console.error("Error tracking activity:", error)
  }
}

// Get user reading stats
export async function getUserReadingStats(userId: string): Promise<ReadingStats> {
  try {
    // In a production app, this would come from the server
    // For now, we'll calculate it from localStorage

    // Get activities
    const storedActivities = localStorage.getItem(`user-activities-${userId}`) || "[]"
    const activities: UserActivity[] = JSON.parse(storedActivities)

    // Calculate stats
    const readActivities = activities.filter((a) => a.action === "read")
    const viewActivities = activities.filter((a) => a.action === "view")
    const completeActivities = activities.filter((a) => a.action === "complete")

    // Calculate total time spent (from metadata.timeSpent in minutes)
    const totalTimeSpent = readActivities.reduce((sum, activity) => {
      return sum + (activity.metadata?.timeSpent || 0)
    }, 0)

    // Count unique books started
    const uniqueBooksStarted = new Set(readActivities.filter((a) => a.contentType === "book").map((a) => a.contentId))
      .size

    // Count unique books completed
    const uniqueBooksCompleted = new Set(
      completeActivities.filter((a) => a.contentType === "book").map((a) => a.contentId),
    ).size

    // Count unique business plans viewed
    const uniqueBusinessPlansViewed = new Set(
      viewActivities.filter((a) => a.contentType === "businessPlan").map((a) => a.contentId),
    ).size

    // Calculate average reading speed
    const readingSpeedActivities = readActivities.filter((a) => a.metadata?.wordsPerMinute)
    const averageReadingSpeed =
      readingSpeedActivities.length > 0
        ? readingSpeedActivities.reduce((sum, activity) => {
            return sum + (activity.metadata?.wordsPerMinute || 0)
          }, 0) / readingSpeedActivities.length
        : 0

    // Get top categories
    const categoryMap = new Map<string, number>()
    activities.forEach((activity) => {
      const category = activity.metadata?.category
      if (category) {
        categoryMap.set(category, (categoryMap.get(category) || 0) + 1)
      }
    })

    const topCategories = Array.from(categoryMap.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Calculate reading streak
    const readDates = readActivities.map((a) => new Date(a.timestamp).toDateString())
    const uniqueReadDates = [...new Set(readDates)].map((d) => new Date(d))
    uniqueReadDates.sort((a, b) => b.getTime() - a.getTime())

    let streak = 0
    if (uniqueReadDates.length > 0) {
      streak = 1
      const today = new Date().toDateString()
      const lastReadDate = uniqueReadDates[0].toDateString()

      // Check if read today
      if (lastReadDate === today) {
        // Check consecutive days before today
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)

        for (let i = 1; i < uniqueReadDates.length; i++) {
          const currentDate = uniqueReadDates[i]
          const expectedDate = new Date(yesterday)
          expectedDate.setDate(expectedDate.getDate() - (i - 1))

          if (currentDate.toDateString() === expectedDate.toDateString()) {
            streak++
          } else {
            break
          }
        }
      } else {
        streak = 0
      }
    }

    return {
      totalTimeSpent,
      booksStarted: uniqueBooksStarted,
      booksCompleted: uniqueBooksCompleted,
      businessPlansViewed: uniqueBusinessPlansViewed,
      averageReadingSpeed: Math.round(averageReadingSpeed),
      topCategories,
      readingStreak: streak,
      lastReadAt: uniqueReadDates.length > 0 ? uniqueReadDates[0].toISOString() : "",
    }
  } catch (error) {
    console.error("Error getting reading stats:", error)
    return {
      totalTimeSpent: 0,
      booksStarted: 0,
      booksCompleted: 0,
      businessPlansViewed: 0,
      averageReadingSpeed: 0,
      topCategories: [],
      readingStreak: 0,
      lastReadAt: "",
    }
  }
}

// Generate personalized recommendations
export async function getPersonalizedRecommendations(
  userId: string,
  allBooks: Book[],
  allBusinessPlans: BusinessPlan[],
  limit = 5,
): Promise<Array<Book | BusinessPlan>> {
  try {
    // In a production app, this would use a sophisticated recommendation algorithm
    // For now, we'll use a simple approach based on user activity

    // Get activities
    const storedActivities = localStorage.getItem(`user-activities-${userId}`) || "[]"
    const activities: UserActivity[] = JSON.parse(storedActivities)

    // Get user preferences
    const viewedContentIds = new Set(activities.map((a) => a.contentId))
    const bookmarkedContentIds = new Set(activities.filter((a) => a.action === "bookmark").map((a) => a.contentId))

    // Extract categories of interest
    const categoryInterests = new Map<string, number>()
    activities.forEach((activity) => {
      const category = activity.metadata?.category
      if (category) {
        categoryInterests.set(category, (categoryInterests.get(category) || 0) + 1)
      }
    })

    // Score all content
    const scoredBooks = allBooks.map((book) => {
      let score = 0
      const reasons: string[] = []

      // Don't recommend already viewed content
      if (viewedContentIds.has(book.id)) {
        score -= 10
        reasons.push("Already viewed")
      }

      // Boost bookmarked content categories
      if (bookmarkedContentIds.has(book.id)) {
        score += 5
        reasons.push("Similar to bookmarked content")
      }

      // Boost based on category interest
      if (book.categories) {
        book.categories.forEach((category) => {
          const interestScore = categoryInterests.get(category) || 0
          score += interestScore
          if (interestScore > 0) {
            reasons.push(`Matches interest in ${category}`)
          }
        })
      }

      // Boost newer content
      if (book.publishedDate) {
        const publishDate = new Date(book.publishedDate)
        const now = new Date()
        const monthsAgo = (now.getFullYear() - publishDate.getFullYear()) * 12 + now.getMonth() - publishDate.getMonth()

        if (monthsAgo < 3) {
          score += 3
          reasons.push("Recently published")
        }
      }

      // Boost highly rated content
      if (book.rating && book.rating > 4) {
        score += 2
        reasons.push("Highly rated")
      }

      return { content: book, score, reasons, type: "book" as const }
    })

    const scoredBusinessPlans = allBusinessPlans.map((plan) => {
      let score = 0
      const reasons: string[] = []

      // Don't recommend already viewed content
      if (viewedContentIds.has(plan.id)) {
        score -= 10
        reasons.push("Already viewed")
      }

      // Boost bookmarked content categories
      if (bookmarkedContentIds.has(plan.id)) {
        score += 5
        reasons.push("Similar to bookmarked content")
      }

      // Boost based on category interest
      if (plan.categories) {
        plan.categories.forEach((category) => {
          const interestScore = categoryInterests.get(category) || 0
          score += interestScore
          if (interestScore > 0) {
            reasons.push(`Matches interest in ${category}`)
          }
        })
      }

      // Boost newer content
      if (plan.createdAt) {
        const createDate = new Date(plan.createdAt)
        const now = new Date()
        const monthsAgo = (now.getFullYear() - createDate.getFullYear()) * 12 + now.getMonth() - createDate.getMonth()

        if (monthsAgo < 3) {
          score += 3
          reasons.push("Recently created")
        }
      }

      return { content: plan, score, reasons, type: "businessPlan" as const }
    })

    // Combine and sort by score
    const allScored = [...scoredBooks, ...scoredBusinessPlans].sort((a, b) => b.score - a.score).slice(0, limit)

    // Return the content objects
    return allScored.map((item) => item.content)
  } catch (error) {
    console.error("Error generating recommendations:", error)
    return []
  }
}

// Get similar content
export function getSimilarContent(
  contentId: string,
  contentType: "book" | "businessPlan",
  allBooks: Book[],
  allBusinessPlans: BusinessPlan[],
  limit = 3,
): Array<Book | BusinessPlan> {
  try {
    // Find the current content
    const currentContent =
      contentType === "book"
        ? allBooks.find((b) => b.id === contentId)
        : allBusinessPlans.find((p) => p.id === contentId)

    if (!currentContent) return []

    // Get categories from current content
    const categories = currentContent.categories || []

    // Score all other content based on category overlap
    const scoredContent = [
      ...allBooks
        .filter((b) => b.id !== contentId)
        .map((book) => {
          const bookCategories = book.categories || []
          const commonCategories = categories.filter((c) => bookCategories.includes(c))
          return {
            content: book,
            score: commonCategories.length,
            type: "book" as const,
          }
        }),
      ...allBusinessPlans
        .filter((p) => p.id !== contentId)
        .map((plan) => {
          const planCategories = plan.categories || []
          const commonCategories = categories.filter((c) => planCategories.includes(c))
          return {
            content: plan,
            score: commonCategories.length,
            type: "businessPlan" as const,
          }
        }),
    ]

    // Sort by score and take top results
    return scoredContent
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map((item) => item.content)
  } catch (error) {
    console.error("Error finding similar content:", error)
    return []
  }
}

