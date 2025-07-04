"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, ArrowRight, Clock } from "lucide-react"
import { api, handleApiError, type BlogPost } from "@/lib/api"
import { MetaTags } from "@/components/seo/meta-tags"
import { BlogCoverImage } from "@/components/optimized-image"

// Additional mock posts for the listing page (these would come from API in production)
const additionalMockPosts: BlogPost[] = [
  {
    id: "3",
    title: "5 Essential Writing Tips from Industry Professionals",
    excerpt: "Learn the secrets that professional writers use to craft compelling narratives and engage their readers from page one.",
    author: "David Wilson",
    publishedDate: "2024-01-10",
    readTime: 6,
    category: "Writing Tips",
    coverImage: "/placeholder.svg?height=200&width=400",
    slug: "essential-writing-tips-professionals"
  },
  {
    id: "4",
    title: "Supporting Independent Authors in the Digital Age",
    excerpt: "Discover how digital platforms are empowering independent authors and creating new opportunities for creative expression.",
    author: "Lisa Rodriguez",
    publishedDate: "2024-01-08",
    readTime: 7,
    category: "Creator Support",
    coverImage: "/placeholder.svg?height=200&width=400",
    slug: "supporting-independent-authors"
  },
  {
    id: "5",
    title: "The Psychology of Reading: Why We Love Stories",
    excerpt: "Delve into the science behind our love for stories and how digital reading can enhance our connection to literature.",
    author: "Dr. Amanda Foster",
    publishedDate: "2024-01-05",
    readTime: 9,
    category: "Psychology",
    coverImage: "/placeholder.svg?height=200&width=400",
    slug: "psychology-of-reading"
  },
  {
    id: "6",
    title: "Building Your Personal Library: A Curator's Guide",
    excerpt: "Learn how to build a meaningful digital library that reflects your interests and supports your personal growth journey.",
    author: "Robert Kim",
    publishedDate: "2024-01-03",
    readTime: 4,
    category: "Reading Tips",
    coverImage: "/placeholder.svg?height=200&width=400",
    slug: "building-personal-library-guide"
  }
]

const categories = ["All", "Technology", "Author Interview", "Writing Tips", "Creator Support", "Psychology", "Reading Tips"]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const blogPosts = await api.getBlogPosts({
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          query: searchQuery || undefined
        })
        // Combine API posts with additional mock posts for demo
        setPosts([...blogPosts, ...additionalMockPosts])
      } catch (err) {
        setError(handleApiError(err))
        console.error("Error fetching blog posts:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [selectedCategory, searchQuery])

  // Since filtering is now handled by the API, we just use the posts directly
  const filteredPosts = posts

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Astewai Blog",
    "description": "Insights on digital reading, publishing, and the future of books",
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://astewai.com'}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "Astewai"
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <MetaTags
        title="Blog - Digital Reading Insights & Publishing Trends"
        description="Explore the latest insights on digital reading, secure publishing platforms, author interviews, and the future of books. Stay updated with Astewai's expert analysis."
        canonical="/blog"
        schema={blogSchema}
      />
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Astewai Blog</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover insights about digital reading, author interviews, writing advice, and the future of literature
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full pl-8 rounded-full bg-card border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4"></div>
                <div className="h-8 bg-muted rounded"></div>
              </CardContent>
            </Card>
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
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <Card className="h-full transition-all duration-300 hover:shadow-xl group cursor-pointer">
                  <div className="aspect-[2/1] relative overflow-hidden rounded-t-xl">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="bg-white/90 text-gray-800">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(post.publishedDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime} min read</span>
                      </div>
                    </div>
                  </CardContent>

                  <div className="px-6 pb-6">
                    <div className="flex items-center text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No articles found matching your criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
