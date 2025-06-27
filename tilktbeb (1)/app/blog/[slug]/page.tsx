"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  Bookmark,
  BookmarkCheck,
  ThumbsUp,
  MessageCircle,
  Eye,
  ChevronRight,
  RefreshCw
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api, handleApiError, type BlogPost } from "@/lib/api"
import { PageErrorBoundary, ComponentErrorBoundary } from "@/components/error-boundary"
import { useAccessibility } from "@/hooks/use-accessibility"
import { BlogPostMeta } from "@/components/seo/meta-tags"
import { BlogCoverImage } from "@/components/optimized-image"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const { announce, AnnouncementRegion } = useAccessibility()

  useEffect(() => {
    const fetchBlogPost = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const blogPost = await api.getBlogPostBySlug(params.slug)
        setPost(blogPost)

        const related = await api.getRelatedBlogPosts(params.slug)
        setRelatedPosts(related)
      } catch (err) {
        setError(handleApiError(err))
        console.error("Error fetching blog post:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPost()
  }, [params.slug])

  useEffect(() => {
    // Track reading progress
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    const message = isBookmarked ? "Bookmark removed" : "Bookmark added"
    const description = isBookmarked
      ? "Post removed from your bookmarks"
      : "Post added to your bookmarks"

    toast({
      title: message,
      description: description,
    })

    // Announce to screen readers
    announce(description)
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        })
      } catch (error) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied",
          description: "Post URL copied to clipboard",
        })
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Post URL copied to clipboard",
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-5/6"></div>
              <div className="h-4 bg-muted rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
          <p className="text-muted-foreground mb-8">
            {error}
          </p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button variant="outline" onClick={() => router.push('/blog')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist or has been moved.
          </p>
          <Button onClick={() => router.push('/blog')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }

  return (
    <PageErrorBoundary>
      <BlogPostMeta
        title={post.title}
        description={post.excerpt}
        author={post.author}
        publishedDate={post.publishedDate}
        slug={post.slug}
        tags={post.tags}
        readTime={post.readTime}
        coverImage={post.coverImage}
      />
      <AnnouncementRegion />
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 w-full h-1 bg-muted z-50"
        role="progressbar"
        aria-label="Reading progress"
        aria-valuenow={readingProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="container py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => router.push('/blog')}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-8">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">
                {post.category}
              </Badge>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.publishedDate)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mb-8" role="group" aria-label="Article actions">
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                aria-label={isBookmarked ? 'Remove bookmark from this article' : 'Bookmark this article'}
                aria-pressed={isBookmarked}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="mr-2 h-4 w-4" aria-hidden="true" />
                ) : (
                  <Bookmark className="mr-2 h-4 w-4" aria-hidden="true" />
                )}
                {isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                aria-label="Share this article"
              >
                <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
                Share
              </Button>
            </div>

            {/* Cover Image */}
            <div className="aspect-[2/1] relative overflow-hidden rounded-xl mb-8">
              <BlogCoverImage
                src={post.coverImage}
                title={post.title}
                priority={true}
                className="w-full h-full"
              />
            </div>
          </header>

          {/* Article Content */}
          <ComponentErrorBoundary componentName="Article Content">
            <article
              className="prose prose-lg max-w-none mb-12"
              role="main"
              aria-label="Article content"
            >
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="prose-headings:font-bold prose-headings:tracking-tight prose-p:text-foreground prose-p:leading-relaxed prose-li:text-foreground prose-strong:text-foreground"
              />
            </article>
          </ComponentErrorBoundary>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="text-sm font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <Separator className="my-8" />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <ComponentErrorBoundary componentName="Related Posts">
              <section>
                <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="h-full transition-all duration-300 hover:shadow-lg group cursor-pointer">
                      <div className="aspect-[2/1] relative overflow-hidden rounded-t-xl">
                        <BlogCoverImage
                          src={relatedPost.coverImage}
                          title={relatedPost.title}
                          className="transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      
                      <CardHeader className="pb-2">
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </CardTitle>
                      </CardHeader>
                      
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {relatedPost.excerpt}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{relatedPost.author}</span>
                          <span>{relatedPost.readTime} min read</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  ))}
                </div>
              </section>
            </ComponentErrorBoundary>
          )}
        </div>
      </div>
    </PageErrorBoundary>
  )
}
