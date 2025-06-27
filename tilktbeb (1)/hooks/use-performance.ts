"use client"

import { useEffect, useRef, useState } from 'react'

// Hook for monitoring Core Web Vitals and performance metrics
export function usePerformanceMonitoring() {
  const metricsRef = useRef<{
    [key: string]: number
  }>({})

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    // Measure First Contentful Paint (FCP)
    const measureFCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            metricsRef.current.fcp = entry.startTime
            console.log('FCP:', entry.startTime)
          }
        })
      })
      observer.observe({ entryTypes: ['paint'] })
    }

    // Measure Largest Contentful Paint (LCP)
    const measureLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        const lastEntry = entries[entries.length - 1]
        metricsRef.current.lcp = lastEntry.startTime
        console.log('LCP:', lastEntry.startTime)
      })
      observer.observe({ entryTypes: ['largest-contentful-paint'] })
    }

    // Measure First Input Delay (FID)
    const measureFID = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          metricsRef.current.fid = entry.processingStart - entry.startTime
          console.log('FID:', entry.processingStart - entry.startTime)
        })
      })
      observer.observe({ entryTypes: ['first-input'] })
    }

    // Measure Cumulative Layout Shift (CLS)
    const measureCLS = () => {
      let clsValue = 0
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value
          }
        })
        metricsRef.current.cls = clsValue
        console.log('CLS:', clsValue)
      })
      observer.observe({ entryTypes: ['layout-shift'] })
    }

    // Initialize measurements
    measureFCP()
    measureLCP()
    measureFID()
    measureCLS()

    // Cleanup function
    return () => {
      // Performance observers are automatically cleaned up
    }
  }, [])

  // Function to get current metrics
  const getMetrics = () => metricsRef.current

  // Function to send metrics to analytics (placeholder)
  const sendMetrics = () => {
    const metrics = getMetrics()
    // In a real app, send to analytics service
    console.log('Performance Metrics:', metrics)
  }

  return {
    getMetrics,
    sendMetrics
  }
}

// Hook for lazy loading content
export function useLazyLoading(threshold = 0.1, rootMargin = '50px') {
  const observerRef = useRef<IntersectionObserver | null>(null)

  const observe = (element: Element, callback: () => void) => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              callback()
              observerRef.current?.unobserve(entry.target)
            }
          })
        },
        { threshold, rootMargin }
      )
    }

    observerRef.current.observe(element)
  }

  const disconnect = () => {
    observerRef.current?.disconnect()
    observerRef.current = null
  }

  useEffect(() => {
    return () => disconnect()
  }, [])

  return { observe, disconnect }
}

// Hook for preloading resources
export function usePreloader() {
  const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => resolve()
      img.onerror = reject
      img.src = src
    })
  }

  const preloadImages = async (sources: string[]): Promise<void> => {
    try {
      await Promise.all(sources.map(preloadImage))
    } catch (error) {
      console.warn('Failed to preload some images:', error)
    }
  }

  const preloadRoute = (href: string) => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = href
    document.head.appendChild(link)
  }

  return {
    preloadImage,
    preloadImages,
    preloadRoute
  }
}

// Hook for debouncing expensive operations
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}


