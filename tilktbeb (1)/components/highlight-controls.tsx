"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { saveHighlight, getContentHighlights, deleteHighlight } from "@/lib/offline-storage"
import { useToast } from "@/hooks/use-toast"

interface HighlightControlsProps {
  contentId: string
}

export function HighlightControls({ contentId }: HighlightControlsProps) {
  const [highlights, setHighlights] = useState<any[]>([])
  const [selectedColor, setSelectedColor] = useState("yellow")
  const { toast } = useToast()

  useEffect(() => {
    loadHighlights()
  }, [contentId])

  const loadHighlights = async () => {
    try {
      const contentHighlights = await getContentHighlights(contentId)
      setHighlights(contentHighlights)
    } catch (error) {
      console.error("Error loading highlights:", error)
    }
  }

  const handleCreateHighlight = async () => {
    try {
      const selection = window.getSelection()

      if (!selection || selection.isCollapsed) {
        toast({
          title: "No text selected",
          description: "Please select some text to highlight",
          variant: "destructive",
        })
        return
      }

      const range = selection.getRangeAt(0)
      const text = selection.toString()

      // This is a simplified approach - in a real app, you'd need to track
      // positions more precisely, possibly using element offsets
      const startPosition = range.startOffset
      const endPosition = range.endOffset

      await saveHighlight(contentId, {
        text,
        startPosition,
        endPosition,
        color: selectedColor,
      })

      toast({
        title: "Highlight created",
        description: "Text has been highlighted",
      })

      loadHighlights()
    } catch (error) {
      console.error("Error creating highlight:", error)
      toast({
        title: "Error",
        description: "Failed to create highlight",
        variant: "destructive",
      })
    }
  }

  const handleDeleteHighlight = async (highlightId: string) => {
    try {
      await deleteHighlight(highlightId)
      setHighlights(highlights.filter((h) => h.id !== highlightId))

      toast({
        title: "Highlight removed",
        description: "The highlight has been removed",
      })
    } catch (error) {
      console.error("Error deleting highlight:", error)
      toast({
        title: "Error",
        description: "Failed to remove highlight",
        variant: "destructive",
      })
    }
  }

  const colorOptions = [
    { name: "Yellow", value: "yellow", class: "bg-yellow-200" },
    { name: "Green", value: "green", class: "bg-green-200" },
    { name: "Blue", value: "blue", class: "bg-blue-200" },
    { name: "Pink", value: "pink", class: "bg-pink-200" },
  ]

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Highlight Color</h3>
        <div className="flex gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              className={`w-6 h-6 rounded-full ${color.class} ${selectedColor === color.value ? "ring-2 ring-primary ring-offset-2" : ""}`}
              onClick={() => setSelectedColor(color.value)}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <Button onClick={handleCreateHighlight} className="w-full">
        Highlight Selected Text
      </Button>

      {highlights.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2">Your Highlights ({highlights.length})</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {highlights.map((highlight) => (
              <div
                key={highlight.id}
                className={`p-2 rounded text-sm relative ${
                  highlight.color === "yellow"
                    ? "bg-yellow-100"
                    : highlight.color === "green"
                      ? "bg-green-100"
                      : highlight.color === "blue"
                        ? "bg-blue-100"
                        : "bg-pink-100"
                }`}
              >
                <p className="pr-6 line-clamp-2">{highlight.text}</p>
                <button
                  className="absolute top-1 right-1 text-muted-foreground hover:text-destructive"
                  onClick={() => handleDeleteHighlight(highlight.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="M6 6 18 18"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

