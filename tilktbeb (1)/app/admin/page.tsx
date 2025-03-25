"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart, PieChart } from "@/components/ui/chart"
import { BookOpen, Briefcase, Users, ShoppingCart } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    // Check if user is logged in as admin
    const adminUser = localStorage.getItem("adminUser")

    if (!adminUser) {
      // Redirect to admin login if not logged in
      router.push("/admin/login")
    } else {
      setIsAuthorized(true)
    }
  }, [router])

  if (!isAuthorized) {
    return null
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Books</p>
              <p className="text-3xl font-bold">247</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Business Plans</p>
              <p className="text-3xl font-bold">54</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Users</p>
              <p className="text-3xl font-bold">1,834</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground text-sm">Total Revenue</p>
              <p className="text-3xl font-bold">$248,950</p>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue for the current year</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { name: "Jan", value: 15000 },
                    { name: "Feb", value: 18500 },
                    { name: "Mar", value: 22000 },
                    { name: "Apr", value: 21000 },
                    { name: "May", value: 24500 },
                    { name: "Jun", value: 28000 },
                    { name: "Jul", value: 30500 },
                    { name: "Aug", value: 32000 },
                    { name: "Sep", value: 33500 },
                    { name: "Oct", value: 29000 },
                    { name: "Nov", value: 26000 },
                    { name: "Dec", value: 24500 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Users</CardTitle>
                <CardDescription>New user registrations by month</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: "Jan", value: 120 },
                    { name: "Feb", value: 145 },
                    { name: "Mar", value: 178 },
                    { name: "Apr", value: 165 },
                    { name: "May", value: 198 },
                    { name: "Jun", value: 220 },
                    { name: "Jul", value: 235 },
                    { name: "Aug", value: 253 },
                    { name: "Sep", value: 268 },
                    { name: "Oct", value: 230 },
                    { name: "Nov", value: 210 },
                    { name: "Dec", value: 195 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Plan</CardTitle>
                <CardDescription>Distribution of plan sales</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart
                  data={[
                    { name: "Base Access", value: 45 },
                    { name: "Small Business", value: 25 },
                    { name: "Medium Business", value: 20 },
                    { name: "Large Business", value: 10 },
                  ]}
                  height={300}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Growth</CardTitle>
                <CardDescription>Year-over-year revenue growth</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { name: "2021", value: 120000 },
                    { name: "2022", value: 180000 },
                    { name: "2023", value: 248950 },
                    { name: "2024 (Projected)", value: 310000 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Age distribution of users</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart
                  data={[
                    { name: "18-24", value: 15 },
                    { name: "25-34", value: 40 },
                    { name: "35-44", value: 25 },
                    { name: "45-54", value: 12 },
                    { name: "55+", value: 8 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Average time spent by users</CardDescription>
              </CardHeader>
              <CardContent>
                <LineChart
                  data={[
                    { name: "Jan", value: 45 },
                    { name: "Feb", value: 48 },
                    { name: "Mar", value: 52 },
                    { name: "Apr", value: 49 },
                    { name: "May", value: 55 },
                    { name: "Jun", value: 58 },
                    { name: "Jul", value: 61 },
                    { name: "Aug", value: 62 },
                    { name: "Sep", value: 63 },
                    { name: "Oct", value: 59 },
                    { name: "Nov", value: 56 },
                    { name: "Dec", value: 54 },
                  ]}
                  xAxisKey="name"
                  yAxisKey="value"
                  height={300}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

