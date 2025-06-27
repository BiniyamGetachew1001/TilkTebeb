"use client"

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
  sizes?: string
  quality?: number
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  sizes,
  quality = 75
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)
  const [imageSrc, setImageSrc] = useState<string>('')

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority])

  // Generate optimized image URL
  useEffect(() => {
    if (!isInView && !priority) return

    // For placeholder images, use them as-is
    if (src.includes('placeholder.svg')) {
      setImageSrc(src)
      return
    }

    // In a real app, you would use a service like Cloudinary, ImageKit, or Next.js Image Optimization
    // For now, we'll use the original src
    setImageSrc(src)
  }, [isInView, priority, src, width, height, quality])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setHasError(true)
    onError?.()
    // Fallback to placeholder
    setImageSrc('/placeholder.svg?height=240&width=180')
  }

  // Generate blur placeholder
  const generateBlurPlaceholder = () => {
    if (blurDataURL) return blurDataURL

    // Only generate canvas on client side
    if (typeof window === 'undefined') {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo='
    }

    // Generate a simple blur placeholder
    const canvas = document.createElement('canvas')
    canvas.width = 10
    canvas.height = 10
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#f3f4f6'
      ctx.fillRect(0, 0, 10, 10)
    }
    return canvas.toDataURL()
  }

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        className
      )}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && !isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm scale-110"
          style={{
            backgroundImage: `url(${generateBlurPlaceholder()})`
          }}
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && placeholder === 'empty' && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}

      {/* Main image */}
      {(isInView || priority) && (
        <img
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          className={cn(
            'transition-opacity duration-300',
            isLoaded ? 'opacity-100' : 'opacity-0',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
          Failed to load image
        </div>
      )}
    </div>
  )
}

// Specific optimized components for common use cases
export function BookCoverImage({
  src,
  title,
  author,
  className,
  priority = false
}: {
  src: string
  title: string
  author: string
  className?: string
  priority?: boolean
}) {
  return (
    <OptimizedImage
      src={src}
      alt={`Cover of ${title} by ${author}`}
      width={180}
      height={240}
      className={cn('object-cover w-full h-full', className)}
      priority={priority}
      placeholder="blur"
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
    />
  )
}

export function BlogCoverImage({
  src,
  title,
  className,
  priority = false
}: {
  src: string
  title: string
  className?: string
  priority?: boolean
}) {
  return (
    <OptimizedImage
      src={src}
      alt={`Cover image for ${title}`}
      width={400}
      height={200}
      className={cn('object-cover w-full h-full', className)}
      priority={priority}
      placeholder="blur"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
