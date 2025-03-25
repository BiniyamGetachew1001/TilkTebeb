"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ReadingStatsCard } from "@/components/analytics/reading-stats-card"
import { ActivityTimeline } from "@/components/analytics/activity-timeline"
import { PersonalizedRecommendations } from "@/components/recommendations/personalized-recommendations"
import { ChartContainer, ChartTitle, Chart, ChartTooltip } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import { Loader2, Calendar, BarChart2 } from "lucide-react"

export default function AnalyticsPage() {
  const [userId, setUserId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock data for charts
  const readingTimeData = [
    { day: "Mon", minutes: 45 },
    { day: "Tue", minutes: 30 },
    { day: "Wed", minutes: 60 },
    { day: "Thu", minutes: 15 },
    { day: "Fri", minutes: 75 },
    { day: "Sat", minutes: 90 },
    { day: "Sun", minutes: 120 },
  ]

  const categoryData = [
    { name: "Business", value: 35 },
    { name: "Self-Help", value: 25 },
    { name: "Finance", value: 20 },
    { name: "Marketing", value: 15 },
    { name: "Technology", value: 5 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  useEffect(() => {
    // In a real app, we would get the user ID from authentication
    // For demo purposes, we'll use a mock user ID
    const mockUserId = "user-123"
    setUserId(mockUserId)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!userId) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center py-12">
          <p className="text-destructive mb-4">User not found. Please log in to view analytics.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Analytics</h1>
        <p className="text-muted-foreground">Track your reading habits and get personalized recommendations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2">
          <ReadingStatsCard userId={userId} />
        </div>

        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Reading Calendar
              </CardTitle>
              <CardDescription>Your reading activity over time</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="h-[300px] mt-4">
                <ChartContainer>
                  <ChartTitle>Reading Time by Day</ChartTitle>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={readingTimeData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="day" />
                        <YAxis
                          label={{
                            value: "Minutes",
                            angle: -90,
                            position: "insideLeft",
                            style: { textAnchor: "middle" },
                          }}
                        />
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">Day</span>
                                      <span className="font-bold text-muted-foreground">{payload[0].payload.day}</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                                        Reading Time
                                      </span>
                                      <span className="font-bold">{payload[0].value} min</span>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="minutes" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart2 className="h-5 w-5 text-primary" />
                Reading by Category
              </CardTitle>
              <CardDescription>Distribution of your reading interests</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="h-[300px] mt-4">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="recommendations" className="h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations" className="h-full">
              <PersonalizedRecommendations userId={userId} />
            </TabsContent>

            <TabsContent value="activity" className="h-full">
              <ActivityTimeline userId={userId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

