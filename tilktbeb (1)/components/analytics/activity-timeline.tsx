"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  BookOpen,
  FileText,
  Bookmark,
  Download,
  CheckCircle,
  BookMarked,
  PenLine,
  FlaskConical,
} from "lucide-react"
import type { UserActivity } from "@/lib/analytics"

interface ActivityTimelineProps {
  userId: string
}

export function ActivityTimeline({ userId }: ActivityTimelineProps) {
  const [activities, setActivities] = useState<UserActivity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "books" | "business-plans">("all")

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setIsLoading(true)

        // In a real app, this would be fetched from an API
        const storedActivities = localStorage.getItem(`user-activities-${userId}`) || "[]"
        const parsedActivities: UserActivity[] = JSON.parse(storedActivities)

        // Sort by timestamp (newest first)
        parsedActivities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

        setActivities(parsedActivities)
      } catch (error) {
        console.error("Error loading activities:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadActivities()
  }, [userId])

  // Filter activities based on selected tab
  const filteredActivities = activities.filter((activity) => {
    if (filter === "all") return true
    if (filter === "books") return activity.contentType === "book"
    if (filter === "business-plans") return activity.contentType === "businessPlan"
    return true
  })

  // Format timestamp to relative time
  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffSec = Math.floor(diffMs / 1000)
    const diffMin = Math.floor(diffSec / 60)
    const diffHour = Math.floor(diffMin / 60)
    const diffDay = Math.floor(diffHour / 24)

    if (diffSec < 60) return "just now"
    if (diffMin < 60) return `${diffMin}m ago`
    if (diffHour < 24) return `${diffHour}h ago`
    if (diffDay < 7) return `${diffDay}d ago`

    return date.toLocaleDateString()
  }

  // Get icon for activity type
  const getActivityIcon = (activity: UserActivity) => {
    switch (activity.action) {
      case "view":
        return activity.contentType === "book" ? <BookOpen className="h-4 w-4" /> : <FileText className="h-4 w-4" />
      case "read":
        return <BookOpen className="h-4 w-4" />
      case "bookmark":
        return <Bookmark className="h-4 w-4" />
      case "download":
        return <Download className="h-4 w-4" />
      case "complete":
        return <CheckCircle className="h-4 w-4" />
      case "quiz_attempt":
        return <FlaskConical className="h-4 w-4" />
      case "flashcard_create":
        return <BookMarked className="h-4 w-4" />
      case "note_create":
        return <PenLine className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  // Get text description for activity
  const getActivityText = (activity: UserActivity) => {
    const contentType = activity.contentType === "book" ? "book" : "business plan"
    const contentTitle = activity.metadata?.title || `a ${contentType}`

    switch (activity.action) {
      case "view":
        return `Viewed ${contentTitle}`
      case "read":
        return `Read ${contentTitle}`
      case "bookmark":
        return `Bookmarked ${contentTitle}`
      case "download":
        return `Downloaded ${contentTitle}`
      case "complete":
        return `Completed ${contentTitle}`
      case "quiz_attempt":
        return `Attempted quiz for ${contentTitle}`
      case "flashcard_create":
        return `Created flashcards for ${contentTitle}`
      case "note_create":
        return `Added notes to ${contentTitle}`
      default:
        return `Interacted with ${contentTitle}`
    }
  }

  // Get badge for content type
  const getContentTypeBadge = (activity: UserActivity) => {
    if (activity.contentType === "book") {
      return (
        <Badge variant="outline" className="text-xs">
          Book
        </Badge>
      )
    } else {
      return (
        <Badge variant="outline" className="text-xs">
          Business Plan
        </Badge>
      )
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Activity Timeline</CardTitle>
          <CardDescription>Your recent activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
            <span>Loading activity...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Activity Timeline</CardTitle>
        <CardDescription>Your recent activity</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="business-plans">Business Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {renderActivityList(filteredActivities)}
          </TabsContent>

          <TabsContent value="books" className="mt-0">
            {renderActivityList(filteredActivities)}
          </TabsContent>

          <TabsContent value="business-plans" className="mt-0">
            {renderActivityList(filteredActivities)}
          </TabsContent>
        </Tabs>

        {activities.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium mb-1">No activity yet</p>
            <p className="text-sm text-muted-foreground mb-4">Your reading and interaction activity will appear here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  function renderActivityList(activities: UserActivity[]) {
    if (activities.length === 0) {
      return (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground">No activities found</p>
        </div>
      )
    }

    return (
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className="mt-0.5 h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              {getActivityIcon(activity)}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-medium">{getActivityText(activity)}</span>
                {getContentTypeBadge(activity)}
              </div>

              <span className="text-xs text-muted-foreground">{formatRelativeTime(activity.timestamp)}</span>

              {activity.metadata?.progress && (
                <span className="text-xs text-muted-foreground mt-1">Progress: {activity.metadata.progress}%</span>
              )}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

