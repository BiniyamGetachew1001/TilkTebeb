"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Zap, Award, BarChart2, Calendar, TrendingUp } from "lucide-react"
import { getUserReadingStats, type ReadingStats } from "@/lib/analytics"

interface ReadingStatsCardProps {
  userId: string
}

export function ReadingStatsCard({ userId }: ReadingStatsCardProps) {
  const [stats, setStats] = useState<ReadingStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        setIsLoading(true)
        const userStats = await getUserReadingStats(userId)
        setStats(userStats)
      } catch (error) {
        console.error("Error loading reading stats:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadStats()
  }, [userId])

  // Format minutes into hours and minutes
  const formatReadingTime = (minutes: number) => {
    if (minutes < 60) return `${minutes} min`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  // Format date to relative time (today, yesterday, or date)
  const formatLastRead = (dateString: string) => {
    if (!dateString) return "Never"

    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString()
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Reading Statistics
          </CardTitle>
          <CardDescription>Loading your reading activity...</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded animate-pulse w-1/3" />
                  <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!stats) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Reading Statistics
          </CardTitle>
          <CardDescription>No reading data available yet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground mb-4">Start reading to see your statistics here</p>
            <Button variant="outline" size="sm">
              Browse Books
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Reading Statistics
        </CardTitle>
        <CardDescription>Your reading activity and progress</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Reading Streak */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <Award className="h-4 w-4 text-primary" />
              Reading Streak
            </h4>
            <span className="text-sm text-muted-foreground">Last read: {formatLastRead(stats.lastReadAt)}</span>
          </div>

          <div className="bg-muted/40 p-4 rounded-lg flex items-center gap-4">
            <div className="bg-primary/10 rounded-full h-12 w-12 flex items-center justify-center">
              <span className="text-xl font-bold text-primary">{stats.readingStreak}</span>
            </div>
            <div>
              <p className="font-medium">
                {stats.readingStreak === 0
                  ? "Start your streak today!"
                  : `${stats.readingStreak} day${stats.readingStreak === 1 ? "" : "s"} streak!`}
              </p>
              <p className="text-sm text-muted-foreground">
                {stats.readingStreak === 0
                  ? "Read today to begin your streak"
                  : "Keep reading daily to maintain your streak"}
              </p>
            </div>
          </div>
        </div>

        {/* Reading Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/40 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Reading Time</span>
            </div>
            <p className="text-2xl font-bold">{formatReadingTime(stats.totalTimeSpent)}</p>
            <p className="text-xs text-muted-foreground">Total time spent reading</p>
          </div>

          <div className="bg-muted/40 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Reading Speed</span>
            </div>
            <p className="text-2xl font-bold">
              {stats.averageReadingSpeed > 0 ? `${stats.averageReadingSpeed} WPM` : "N/A"}
            </p>
            <p className="text-xs text-muted-foreground">Average words per minute</p>
          </div>

          <div className="bg-muted/40 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Books</span>
            </div>
            <p className="text-2xl font-bold">{stats.booksStarted}</p>
            <p className="text-xs text-muted-foreground">{stats.booksCompleted} completed</p>
          </div>

          <div className="bg-muted/40 p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Business Plans</span>
            </div>
            <p className="text-2xl font-bold">{stats.businessPlansViewed}</p>
            <p className="text-xs text-muted-foreground">Viewed</p>
          </div>
        </div>

        {/* Top Categories */}
        {stats.topCategories.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-primary" />
              Top Categories
            </h4>

            <div className="space-y-2">
              {stats.topCategories.map((category, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{category.category}</span>
                    <span className="text-muted-foreground">{category.count} items</span>
                  </div>
                  <Progress value={(category.count / stats.topCategories[0].count) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button variant="outline" className="w-full" size="sm">
          <Calendar className="h-4 w-4 mr-2" />
          View Detailed Analytics
        </Button>
      </CardFooter>
    </Card>
  )
}

