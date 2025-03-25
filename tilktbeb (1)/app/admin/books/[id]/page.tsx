"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Book } from "@/types/book"

export default function AdminEditBookPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [book, setBook] = useState<Book | null>(null)
  const [isAuthorized, setIsAuthorized] = useState(false)

  // Form state
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [coverUrl, setCoverUrl] = useState("")
  const [category, setCategory] = useState("")
  const [rating, setRating] = useState(0)
  const [pages, setPages] = useState(0)
  const [language, setLanguage] = useState("English")
  const [summary, setSummary] = useState("")
  const [keyInsights, setKeyInsights] = useState("")
  const [applications, setApplications] = useState("")
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    // Check if user is logged in as admin
    const adminUser = localStorage.getItem("adminUser")

    if (!adminUser) {
      // Redirect to admin login if not logged in
      router.push("/admin/login")
    } else {
      setIsAuthorized(true)
      fetchBook()
    }
  }, [router])

  const fetchBook = async () => {
    try {
      if (params.id === "new") {
        // Creating a new book
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      const response = await fetch(`/api/admin/books/${params.id}`)

      if (!response.ok) {
        throw new Error("Failed to fetch book")
      }

      const data = await response.json()
      setBook(data)

      // Set form state
      setTitle(data.title)
      setAuthor(data.author)
      setCoverUrl(data.coverUrl)
      setCategory(data.category)
      setRating(data.rating)
      setPages(data.pages)
      setLanguage(data.language)
      setSummary(data.summary)
      setKeyInsights(data.keyInsights)
      setApplications(data.applications)
      setIsPremium(data.isPremium)
    } catch (error) {
      console.error("Error fetching book:", error)
      toast({
        title: "Error",
        description: "Failed to load book details. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title || !author || !category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    try {
      setIsSaving(true)

      const bookData = {
        title,
        author,
        coverUrl,
        category,
        rating,
        pages,
        language,
        summary,
        keyInsights,
        applications,
        isPremium,
      }

      const url = params.id === "new" ? "/api/admin/books" : `/api/admin/books/${params.id}`

      const method = params.id === "new" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${params.id === "new" ? "create" : "update"} book`)
      }

      toast({
        title: "Success",
        description: `Book ${params.id === "new" ? "created" : "updated"} successfully`,
      })

      // Redirect to books list
      router.push("/admin/books")
    } catch (error) {
      console.error("Error saving book:", error)
      toast({
        title: "Error",
        description: `Failed to ${params.id === "new" ? "create" : "update"} book. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (!isAuthorized) {
    return null
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link href="/admin/books" className="mr-4">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{params.id === "new" ? "Add New Book" : "Edit Book"}</h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading book details...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="grid gap-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author *</Label>
                  <Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="coverUrl">Cover Image URL</Label>
                  <Input
                    id="coverUrl"
                    value={coverUrl}
                    onChange={(e) => setCoverUrl(e.target.value)}
                    placeholder="/placeholder.svg?height=240&width=180"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Productivity">Productivity</SelectItem>
                      <SelectItem value="Entrepreneurship">Entrepreneurship</SelectItem>
                      <SelectItem value="Leadership">Leadership</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Self-Development">Self-Development</SelectItem>
                      <SelectItem value="Startup">Startup</SelectItem>
                      <SelectItem value="Wealth">Wealth</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating (0-5)</Label>
                  <Input
                    id="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={rating}
                    onChange={(e) => setRating(Number.parseFloat(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pages">Page Count</Label>
                  <Input
                    id="pages"
                    type="number"
                    min="0"
                    value={pages}
                    onChange={(e) => setPages(Number.parseInt(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Amharic">Amharic</SelectItem>
                      <SelectItem value="French">French</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                  id="summary"
                  rows={5}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Enter a brief summary of the book"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyInsights">Key Insights</Label>
                <Textarea
                  id="keyInsights"
                  rows={5}
                  value={keyInsights}
                  onChange={(e) => setKeyInsights(e.target.value)}
                  placeholder="Enter key insights from the book"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applications">Applications</Label>
                <Textarea
                  id="applications"
                  rows={5}
                  value={applications}
                  onChange={(e) => setApplications(e.target.value)}
                  placeholder="Enter practical applications of the book's teachings"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="isPremium" checked={isPremium} onCheckedChange={setIsPremium} />
                <Label htmlFor="isPremium">Mark as Premium Content</Label>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Link href="/admin/books">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : params.id === "new" ? "Create Book" : "Update Book"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  )
}

