"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { InfoIcon } from "lucide-react"

export function ThemeRationale() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <InfoIcon className="h-4 w-4" />
          <span className="sr-only">Theme information</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>About Our Background Themes</DialogTitle>
          <DialogDescription>
            We've carefully designed our background themes to enhance your reading experience
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          <div>
            <h3 className="font-semibold text-lg">Black & White Gradient</h3>
            <p className="text-muted-foreground">
              A modern, minimalist gradient that creates a clean, professional look. This theme works well for focused
              reading sessions but may cause eye strain during extended use due to high contrast.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Parchment</h3>
            <p className="text-muted-foreground">
              Inspired by traditional paper, this warm gradient mimics the experience of reading physical books. The
              subtle texture reduces eye strain and creates a nostalgic reading environment.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Amber Glow</h3>
            <p className="text-muted-foreground">
              Our recommended theme for extended reading. The warm amber tones filter blue light naturally, reducing eye
              fatigue while creating an inviting, cozy atmosphere reminiscent of reading by lamplight.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Serene Blue</h3>
            <p className="text-muted-foreground">
              A calming blue gradient that promotes focus and concentration. This theme is particularly effective for
              technical or educational content where analytical thinking is beneficial.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Subtle Cream</h3>
            <p className="text-muted-foreground">
              The gentlest of our gradients, designed to be as unobtrusive as possible. This theme maximizes readability
              with minimal visual distraction, making it ideal for lengthy reading sessions.
            </p>
          </div>
        </div>

        <DialogFooter>
          <p className="text-sm text-muted-foreground">
            All themes are designed with accessibility in mind and work seamlessly with our dark mode option.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

