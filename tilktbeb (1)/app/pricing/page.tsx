"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function PricingPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          One-time payment for lifetime access to premium business content
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {/* Base Plan */}
        <Card className="border-primary">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Base Access</CardTitle>
            <CardDescription>One-time payment for lifetime access</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$99</span>
              <span className="text-muted-foreground ml-2">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>200+ business book summaries</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>20 free business ideas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Interactive reading system</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Offline reading mode</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Lifetime access</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/checkout?plan=base" className="w-full">
              <Button className="w-full">Get Started</Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Small Business Plan */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Small Business</CardTitle>
            <CardDescription>Premium small business plans</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$149</span>
              <span className="text-muted-foreground ml-2">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Everything in Base Access</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Small business plan collection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Low investment requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Solopreneur-friendly</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Lifetime access</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/checkout?plan=small" className="w-full">
              <Button variant="outline" className="w-full">
                Choose Plan
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Medium Business Plan */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Medium Business</CardTitle>
            <CardDescription>Premium medium business plans</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$249</span>
              <span className="text-muted-foreground ml-2">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Everything in Base Access</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Medium business plan collection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Scaling strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Team management frameworks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Lifetime access</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/checkout?plan=medium" className="w-full">
              <Button variant="outline" className="w-full">
                Choose Plan
              </Button>
            </Link>
          </CardFooter>
        </Card>

        {/* Large Business Plan */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Large Business</CardTitle>
            <CardDescription>Premium large business plans</CardDescription>
            <div className="mt-4">
              <span className="text-4xl font-bold">$399</span>
              <span className="text-muted-foreground ml-2">one-time</span>
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Everything in Base Access</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Large business plan collection</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Enterprise expansion strategies</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Market domination frameworks</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Lifetime access</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Link href="/checkout?plan=large" className="w-full">
              <Button variant="outline" className="w-full">
                Choose Plan
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>

        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Is this really a one-time payment?</h3>
            <p className="text-muted-foreground">
              Yes, TILkTBEB operates on a one-time payment model. Once you purchase a plan, you'll have lifetime access
              to all the content included in that plan with no recurring fees or subscriptions.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We currently accept payments through Telebirr and Commercial Bank of Ethiopia (CBE). We're working on
              adding more payment options in the future.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Can I upgrade my plan later?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade from the Base Access to any of the business plan tiers at any time. You'll only need
              to pay the difference between your current plan and the new plan.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
            <p className="text-muted-foreground">
              We offer a 7-day money-back guarantee if you're not satisfied with your purchase. Please contact our
              support team for assistance with refunds.
            </p>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-2">How often is new content added?</h3>
            <p className="text-muted-foreground">
              We regularly add new book summaries and business plans to our platform. On average, we add 5-10 new book
              summaries and 2-3 new business plans each month.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

