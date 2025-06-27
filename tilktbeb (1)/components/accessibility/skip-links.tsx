"use client"

import { Button } from "@/components/ui/button"

export function SkipLinks() {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <div className="fixed top-0 left-0 z-50 bg-background border border-border p-2 m-2 rounded-md">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const mainContent = document.getElementById('main-content')
            if (mainContent) {
              mainContent.focus()
              mainContent.scrollIntoView()
            }
          }}
          className="mr-2"
        >
          Skip to main content
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const navigation = document.getElementById('main-navigation')
            if (navigation) {
              navigation.focus()
              navigation.scrollIntoView()
            }
          }}
        >
          Skip to navigation
        </Button>
      </div>
    </div>
  )
}
