"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Lock } from "lucide-react"

// Define types for business plan previews
interface BusinessPlanPreview {
  id: string
  title: string
  category: string
  size: "small" | "medium" | "large"
  description: string
  isPremium: boolean
}

export default function BusinessPlansPage() {
  const [businessPlans, setBusinessPlans] = useState<BusinessPlanPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeSize, setActiveSize] = useState<"small" | "medium" | "large">("small")

  // Fetch business plans from API
  useEffect(() => {
    const fetchBusinessPlans = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/business-plans")

        if (!response.ok) {
          throw new Error("Failed to fetch business plans")
        }

        const data = await response.json()
        setBusinessPlans(data)
      } catch (err) {
        setError("Error loading business plans. Please try again later.")
        console.error("Error fetching business plans:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessPlans()
  }, [])

  // Filter plans by size
  const filteredPlans = businessPlans.filter((plan) => plan.size === activeSize)

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Business Plans</h1>
          <p className="text-muted-foreground">Detailed business plans for different business sizes</p>
        </div>
      </div>

      <Tabs
        defaultValue="small"
        value={activeSize}
        onValueChange={(value) => setActiveSize(value as "small" | "medium" | "large")}
        className="mb-12"
      >
        <TabsList className="mb-8">
          <TabsTrigger value="small">Small Business</TabsTrigger>
          <TabsTrigger value="medium">Medium Business</TabsTrigger>
          <TabsTrigger value="large">Large Business</TabsTrigger>
        </TabsList>

        <TabsContent value="small">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-40 bg-muted rounded-lg mb-3"></div>
                  <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{plan.title}</CardTitle>
                        <CardDescription>{plan.category}</CardDescription>
                      </div>
                      {plan.isPremium && (
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          Premium
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Small Business</span>
                    </div>
                    <p className="text-sm">{plan.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/business-plans/${plan.size}/${plan.id}`} className="w-full">
                      <Button variant={plan.isPremium ? "outline" : "default"} className="w-full">
                        {plan.isPremium ? "Unlock Plan" : "View Plan"}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="medium">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-40 bg-muted rounded-lg mb-3"></div>
                  <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{plan.title}</CardTitle>
                        <CardDescription>{plan.category}</CardDescription>
                      </div>
                      {plan.isPremium && (
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          Premium
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Medium Business</span>
                    </div>
                    <p className="text-sm">{plan.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/business-plans/${plan.size}/${plan.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Unlock Plan
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="large">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="h-40 bg-muted rounded-lg mb-3"></div>
                  <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-muted rounded w-full mb-2"></div>
                  <div className="h-4 bg-muted rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{plan.title}</CardTitle>
                        <CardDescription>{plan.category}</CardDescription>
                      </div>
                      {plan.isPremium && (
                        <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          Premium
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Briefcase className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Large Business</span>
                    </div>
                    <p className="text-sm">{plan.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/business-plans/${plan.size}/${plan.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Unlock Plan
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <div className="bg-primary/5 rounded-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Unlock All Premium Business Plans</h2>
            <p className="text-muted-foreground mb-6">
              Get lifetime access to all our premium business plans with a one-time payment. Choose the business size
              that fits your needs or get access to all plans.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/pricing">
                <Button size="lg">View Pricing</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline" size="lg">
                  Sign Up Now
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-background rounded-md p-4 text-center shadow-sm">
              <h3 className="font-semibold mb-2">Small</h3>
              <p className="text-3xl font-bold mb-1">$149</p>
              <p className="text-xs text-muted-foreground">one-time payment</p>
            </div>
            <div className="bg-background rounded-md p-4 text-center shadow-sm">
              <h3 className="font-semibold mb-2">Medium</h3>
              <p className="text-3xl font-bold mb-1">$249</p>
              <p className="text-xs text-muted-foreground">one-time payment</p>
            </div>
            <div className="bg-background rounded-md p-4 text-center shadow-sm">
              <h3 className="font-semibold mb-2">Large</h3>
              <p className="text-3xl font-bold mb-1">$399</p>
              <p className="text-xs text-muted-foreground">one-time payment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

