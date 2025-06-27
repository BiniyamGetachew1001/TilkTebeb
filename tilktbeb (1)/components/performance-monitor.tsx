"use client"

import { useEffect } from 'react'
import { usePerformanceMonitoring } from '@/hooks/use-performance'

export function PerformanceMonitor() {
  const { sendMetrics } = usePerformanceMonitoring()

  useEffect(() => {
    // Send metrics after page load
    const timer = setTimeout(() => {
      sendMetrics()
    }, 5000) // Wait 5 seconds after load

    return () => clearTimeout(timer)
  }, [sendMetrics])

  // This component doesn't render anything visible
  return null
}
