"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Building2, DollarSign, Users, ChevronRight } from "lucide-react"

interface BusinessPlan {
  id: string
  title: string
  category: string
  size: "small" | "medium" | "large"
  description: string
  overview: string
  marketAnalysis: string
  financials: string
  implementation: string
  isPremium: boolean
}

export default function BusinessPlanPage({ params }: { params: { size: string; id: string } }) {
  const [plan, setPlan] = useState<BusinessPlan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [similarPlans, setSimilarPlans] = useState<any[]>([])

  // Fetch business plan from API
  useEffect(() => {
    const fetchBusinessPlan = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/business-plans/${params.id}`)

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Business plan not found")
          }
          throw new Error("Failed to fetch business plan details")
        }

        const data = await response.json()
        setPlan(data)

        // Fetch similar plans
        const similarResponse = await fetch(`/api/business-plans?size=${params.size}&limit=2`)
        if (similarResponse.ok) {
          const similarData = await similarResponse.json()
          // Filter out the current plan
          setSimilarPlans(similarData.filter((p: any) => p.id !== params.id))
        }
      } catch (err) {
        setError("Error loading business plan. Please try again later.")
        console.error("Error fetching business plan:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBusinessPlan()
  }, [params.id, params.size])

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <Link
          href="/business-plans"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Business Plans
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
              <div className="h-10 bg-muted rounded w-full mb-6"></div>
              <div className="h-4 bg-muted rounded w-full mb-3"></div>
              <div className="h-4 bg-muted rounded w-full mb-3"></div>
              <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-muted rounded w-full mb-3"></div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="animate-pulse">
              <div className="h-40 bg-muted rounded-lg mb-4"></div>
              <div className="h-40 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !plan) {
    return (
      <div className="container py-8 md:py-12">
        <Link
          href="/business-plans"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Business Plans
        </Link>

        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error || "Business plan not found"}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <Link
        href="/business-plans"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Business Plans
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{plan.title}</CardTitle>
                  <CardDescription>{plan.category}</CardDescription>
                </div>
                {plan.isPremium && (
                  <Button variant="outline" className="ml-4">
                    Unlock Plan
                  </Button>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="market">Market Analysis</TabsTrigger>
                  <TabsTrigger value="financials">Financials</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: plan.overview }}
                  />
                </TabsContent>

                <TabsContent value="market" className="mt-6">
                  <div
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: plan.marketAnalysis }}
                  />
                </TabsContent>

                <TabsContent value="financials" className="mt-6">
                  <div
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: plan.financials }}
                  />
                </TabsContent>

                <TabsContent value="implementation" className="mt-6">
                  <div
                    className="prose max-w-none dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: plan.implementation }}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Plan Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Business Size: {plan.size.charAt(0).toUpperCase() + plan.size.slice(1)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Target Market: Local & Online</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Investment Level: Medium</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              {plan.isPremium ? (
                <>
                  <Button className="w-full">Unlock Full Plan</Button>
                  <p className="text-sm text-muted-foreground text-center">One-time purchase for lifetime access</p>
                </>
              ) : (
                <Button className="w-full">Download PDF</Button>
              )}
            </CardFooter>
          </Card>

          {similarPlans.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Similar Plans</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {similarPlans.map((similarPlan) => (
                  <Link
                    key={similarPlan.id}
                    href={`/business-plans/${similarPlan.size}/${similarPlan.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent"
                  >
                    <div>
                      <p className="font-medium">{similarPlan.title}</p>
                      <p className="text-sm text-muted-foreground">{similarPlan.category}</p>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

