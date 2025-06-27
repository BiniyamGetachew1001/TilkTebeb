"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { 
  ArrowLeft, 
  Settings, 
  Sun, 
  Moon, 
  Palette, 
  Type, 
  ChevronLeft, 
  ChevronRight,
  BookOpen,
  User,
  Shield
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Book } from "@/types/book"
import { mockBooks } from "@/lib/mock-data"

interface ReaderPageProps {
  params: {
    bookId: string
  }
}

type ReadingTheme = 'light' | 'sepia' | 'dark'
type FontSize = 'small' | 'medium' | 'large' | 'xl'

const fontSizeClasses = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg',
  xl: 'text-xl'
}

const themeClasses = {
  light: 'bg-white text-gray-900',
  sepia: 'bg-amber-50 text-amber-900',
  dark: 'bg-gray-900 text-gray-100'
}

export default function ReaderPage({ params }: ReaderPageProps) {
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(310) // Mock total pages
  const [showSettings, setShowSettings] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [readingTheme, setReadingTheme] = useState<ReadingTheme>('light')
  const [fontSize, setFontSize] = useState<FontSize>('medium')
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const { toast } = useToast()
  const hideControlsTimer = useRef<NodeJS.Timeout>()

  // Mock book content
  const bookContent = `
    <h1>Chapter 1: The Beginning</h1>
    <p>This is the beginning of our journey into the world of digital reading. In this secure environment, you can enjoy premium content without worrying about piracy or unauthorized distribution.</p>
    
    <p>The Astewai platform ensures that authors' intellectual property is protected while providing readers with an exceptional reading experience. Our advanced security measures include:</p>
    
    <ul>
      <li>Encrypted content delivery</li>
      <li>User-specific watermarking</li>
      <li>Secure session management</li>
      <li>Real-time access control</li>
    </ul>
    
    <p>As you read, your progress is automatically saved and synchronized across all your devices. You can customize your reading experience with different themes, font sizes, and other preferences.</p>
    
    <h2>The Future of Digital Reading</h2>
    <p>Digital reading platforms like Astewai represent the future of how we consume written content. By eliminating the need for downloads while maintaining security, we create a win-win situation for both authors and readers.</p>
    
    <p>Authors can be confident that their work is protected, while readers enjoy instant access to their purchased books from any device, anywhere in the world.</p>
    
    <blockquote>
      "The best way to predict the future is to create it." - Peter Drucker
    </blockquote>
    
    <p>This philosophy drives our approach to digital publishing and reading. We're not just adapting to change; we're leading it.</p>
  `

  useEffect(() => {
    // Simulate API call to fetch book details
    setTimeout(() => {
      const foundBook = mockBooks.find(b => b.id === params.bookId)
      if (foundBook) {
        setBook(foundBook)
      }
      setIsLoading(false)
    }, 1000)
  }, [params.bookId])

  useEffect(() => {
    // Calculate progress based on current page
    const newProgress = (currentPage / totalPages) * 100
    setProgress(newProgress)
  }, [currentPage, totalPages])

  useEffect(() => {
    // Auto-hide controls after 3 seconds of inactivity
    const resetTimer = () => {
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current)
      }
      setShowControls(true)
      hideControlsTimer.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }

    const handleMouseMove = () => resetTimer()
    const handleKeyPress = () => resetTimer()

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('keydown', handleKeyPress)

    resetTimer()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('keydown', handleKeyPress)
      if (hideControlsTimer.current) {
        clearTimeout(hideControlsTimer.current)
      }
    }
  }, [])

  const handleBackToLibrary = () => {
    router.push('/library')
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handleProgressChange = (value: number[]) => {
    const newPage = Math.round((value[0] / 100) * totalPages)
    setCurrentPage(Math.max(1, newPage))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your book...</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <p className="text-muted-foreground mb-6">The book you're trying to read is not available.</p>
          <Button onClick={handleBackToLibrary}>Back to Library</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${themeClasses[readingTheme]}`}>
      {/* Top Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showControls ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="bg-background/95 backdrop-blur-sm border-b px-4 py-3">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleBackToLibrary}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Library
              </Button>
              <div className="text-sm font-medium truncate max-w-xs">
                {book.title}
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="fixed top-16 right-4 z-40">
          <Card className="w-80 p-4">
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Reading Theme
                </h3>
                <div className="flex gap-2">
                  <Button
                    variant={readingTheme === 'light' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setReadingTheme('light')}
                  >
                    <Sun className="h-4 w-4 mr-1" />
                    Light
                  </Button>
                  <Button
                    variant={readingTheme === 'sepia' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setReadingTheme('sepia')}
                  >
                    <Palette className="h-4 w-4 mr-1" />
                    Sepia
                  </Button>
                  <Button
                    variant={readingTheme === 'dark' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setReadingTheme('dark')}
                  >
                    <Moon className="h-4 w-4 mr-1" />
                    Dark
                  </Button>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Font Size
                </h3>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large', 'xl'] as FontSize[]).map((size) => (
                    <Button
                      key={size}
                      variant={fontSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFontSize(size)}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <div className="pt-16 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className={`prose prose-lg max-w-none ${fontSizeClasses[fontSize]}`}>
            <div dangerouslySetInnerHTML={{ __html: bookContent }} />
          </div>
          
          {/* Anti-piracy watermark */}
          <div className="fixed bottom-20 right-4 opacity-20 text-xs text-muted-foreground pointer-events-none">
            <div className="flex items-center gap-1">
              <Shield className="h-3 w-3" />
              <span>Licensed to: user@example.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ${
        showControls ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="bg-background/95 backdrop-blur-sm border-t px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex-1 flex items-center gap-4">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  Page {currentPage} of {totalPages}
                </span>
                <Slider
                  value={[progress]}
                  onValueChange={handleProgressChange}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {progress.toFixed(0)}%
                </span>
              </div>
              
              <Button variant="ghost" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
