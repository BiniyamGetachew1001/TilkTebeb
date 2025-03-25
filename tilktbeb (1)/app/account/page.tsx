import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Briefcase, Clock, Download } from "lucide-react"
import Link from "next/link"

export default function AccountPage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Account</h1>
          <p className="text-muted-foreground">Manage your account and view your activity</p>
        </div>
        <Link href="/settings">
          <Button>Settings</Button>
        </Link>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">JD</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">John Doe</h2>
              <p className="text-muted-foreground">john.doe@example.com</p>
              <div className="mt-4 p-2 bg-primary/10 text-primary rounded-full text-sm font-medium">Premium Member</div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Link href="/settings">
                <Button variant="outline">Edit Profile</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Current Plan</h3>
                  <p className="text-primary font-bold">Medium Business</p>
                </div>
                <div>
                  <h3 className="font-medium">Status</h3>
                  <p className="text-green-600 dark:text-green-400">Active</p>
                </div>
                <div>
                  <h3 className="font-medium">Purchased On</h3>
                  <p>January 15, 2023</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/pricing" className="w-full">
                <Button variant="outline" className="w-full">
                  Upgrade Plan
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Tabs defaultValue="activity">
            <TabsList className="bg-muted/50 p-1 rounded-lg">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="books">My Books</TabsTrigger>
              <TabsTrigger value="plans">My Plans</TabsTrigger>
            </TabsList>

            <TabsContent value="activity" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions with TelkTibeb</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Read "The Psychology of Money"</h3>
                        <p className="text-sm text-muted-foreground">You read this book summary for 15 minutes</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 2 hours ago
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Viewed "Local Coffee Shop" Business Plan</h3>
                        <p className="text-sm text-muted-foreground">You viewed this business plan</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 1 day ago
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Download className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Saved "Atomic Habits" for Offline Reading</h3>
                        <p className="text-sm text-muted-foreground">You saved this book for offline access</p>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 3 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="books" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Books</CardTitle>
                  <CardDescription>Books you've interacted with</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src="/placeholder.svg?height=80&width=60"
                        alt="Book cover"
                        className="w-[60px] h-[80px] object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">The Psychology of Money</h3>
                        <p className="text-sm text-muted-foreground">Morgan Housel</p>
                        <div className="flex gap-2 mt-2">
                          <Link href="/books/the-psychology-of-money">
                            <Button size="sm" variant="outline">
                              Continue
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src="/placeholder.svg?height=80&width=60"
                        alt="Book cover"
                        className="w-[60px] h-[80px] object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">Atomic Habits</h3>
                        <p className="text-sm text-muted-foreground">James Clear</p>
                        <div className="flex gap-2 mt-2">
                          <Link href="/books/atomic-habits">
                            <Button size="sm" variant="outline">
                              Continue
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 p-4 border rounded-lg">
                      <img
                        src="/placeholder.svg?height=80&width=60"
                        alt="Book cover"
                        className="w-[60px] h-[80px] object-cover rounded"
                      />
                      <div>
                        <h3 className="font-medium">Sapiens</h3>
                        <p className="text-sm text-muted-foreground">Yuval Noah Harari</p>
                        <div className="flex gap-2 mt-2">
                          <Link href="/books/sapiens">
                            <Button size="sm" variant="outline">
                              Continue
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/books">
                    <Button variant="outline">View All Books</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="plans" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Business Plans</CardTitle>
                  <CardDescription>Business plans you've accessed</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Local Coffee Shop</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Food & Beverage</p>
                      <Link href="/business-plans/small/1">
                        <Button size="sm" variant="outline">
                          View Plan
                        </Button>
                      </Link>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Briefcase className="h-4 w-4 text-primary" />
                        <h3 className="font-medium">Freelance Web Development</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">Technology</p>
                      <Link href="/business-plans/small/2">
                        <Button size="sm" variant="outline">
                          View Plan
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/business-plans">
                    <Button variant="outline">View All Plans</Button>
                  </Link>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

