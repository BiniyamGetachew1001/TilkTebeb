"use client"

import { useEffect, useRef } from 'react'

// Hook for managing focus and screen reader announcements
export function useAccessibility() {
  const announceRef = useRef<HTMLDivElement>(null)

  // Function to announce text to screen readers
  const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    if (announceRef.current) {
      announceRef.current.setAttribute('aria-live', priority)
      announceRef.current.textContent = message
      
      // Clear the message after a short delay to allow for re-announcements
      setTimeout(() => {
        if (announceRef.current) {
          announceRef.current.textContent = ''
        }
      }, 1000)
    }
  }

  // Function to focus an element by ID
  const focusElement = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.focus()
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  // Function to trap focus within a container
  const trapFocus = (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault()
            firstElement.focus()
          }
        }
      }
      
      if (e.key === 'Escape') {
        // Allow escape to close modals/dialogs
        const closeButton = container.querySelector('[data-close]') as HTMLElement
        if (closeButton) {
          closeButton.click()
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    
    // Focus the first element
    if (firstElement) {
      firstElement.focus()
    }

    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }

  // Screen reader announcement element
  const AnnouncementRegion = () => (
    <div
      ref={announceRef}
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
      role="status"
    />
  )

  return {
    announce,
    focusElement,
    trapFocus,
    AnnouncementRegion
  }
}

// Hook for managing keyboard navigation
export function useKeyboardNavigation() {
  const handleKeyDown = (e: KeyboardEvent, callbacks: {
    onEnter?: () => void
    onSpace?: () => void
    onEscape?: () => void
    onArrowUp?: () => void
    onArrowDown?: () => void
    onArrowLeft?: () => void
    onArrowRight?: () => void
  }) => {
    switch (e.key) {
      case 'Enter':
        if (callbacks.onEnter) {
          e.preventDefault()
          callbacks.onEnter()
        }
        break
      case ' ':
        if (callbacks.onSpace) {
          e.preventDefault()
          callbacks.onSpace()
        }
        break
      case 'Escape':
        if (callbacks.onEscape) {
          e.preventDefault()
          callbacks.onEscape()
        }
        break
      case 'ArrowUp':
        if (callbacks.onArrowUp) {
          e.preventDefault()
          callbacks.onArrowUp()
        }
        break
      case 'ArrowDown':
        if (callbacks.onArrowDown) {
          e.preventDefault()
          callbacks.onArrowDown()
        }
        break
      case 'ArrowLeft':
        if (callbacks.onArrowLeft) {
          e.preventDefault()
          callbacks.onArrowLeft()
        }
        break
      case 'ArrowRight':
        if (callbacks.onArrowRight) {
          e.preventDefault()
          callbacks.onArrowRight()
        }
        break
    }
  }

  return { handleKeyDown }
}

// Hook for managing reduced motion preferences
export function useReducedMotion() {
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  return prefersReducedMotion
}
