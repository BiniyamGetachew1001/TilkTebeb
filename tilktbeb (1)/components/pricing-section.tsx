import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { SectionDivider } from "@/components/section-divider"

export function PricingSection() {
  return (
    <>
      <SectionDivider position="top" />
      <section className="py-16 px-4 md:px-6 lg:px-8 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              One-time payment for lifetime access to premium business content
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* Base Plan */}
            <Card className="border-secondary card-3d glass dark:glass-dark">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Base Access</CardTitle>
                <CardDescription>One-time payment for lifetime access</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold gold-accent">$99</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>200+ business book summaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>20 free business ideas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Interactive reading system</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Offline reading mode</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/signup" className="w-full">
                  <Button className="w-full btn-hover">Get Started</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Small Business Plan */}
            <Card className="card-3d glass dark:glass-dark">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Small Business</CardTitle>
                <CardDescription>Premium small business plans</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold gold-accent">$149</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Everything in Base Access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Small business plan collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Low investment requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Solopreneur-friendly</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/signup?plan=small" className="w-full">
                  <Button variant="outline" className="w-full btn-hover">
                    Choose Plan
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Medium Business Plan */}
            <Card className="card-3d glass dark:glass-dark">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Medium Business</CardTitle>
                <CardDescription>Premium medium business plans</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold gold-accent">$249</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Everything in Base Access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Medium business plan collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Scaling strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Team management frameworks</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/signup?plan=medium" className="w-full">
                  <Button variant="outline" className="w-full btn-hover">
                    Choose Plan
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Large Business Plan */}
            <Card className="card-3d glass dark:glass-dark">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Large Business</CardTitle>
                <CardDescription>Premium large business plans</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold gold-accent">$399</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Everything in Base Access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Large business plan collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Enterprise expansion strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                    <span>Market domination frameworks</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/signup?plan=large" className="w-full">
                  <Button variant="outline" className="w-full btn-hover">
                    Choose Plan
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
      <SectionDivider position="bottom" />
    </>
  )
}

