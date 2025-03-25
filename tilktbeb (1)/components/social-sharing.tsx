"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Share2, Copy, Twitter, Facebook, Linkedin, Mail, Check, LinkIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SocialSharingProps {
  contentId: string
  contentTitle: string
  contentType: "book" | "businessPlan"
  quote?: string
}

export function SocialSharing({ contentId, contentTitle, contentType, quote }: SocialSharingProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const { toast } = useToast()

  // Generate sharing URL
  const getShareUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : ""
    return `${baseUrl}/${contentType === "book" ? "books" : "business-plans"}/${contentId}`
  }

  // Generate sharing text
  const getShareText = () => {
    const text = customMessage || `Check out "${contentTitle}" on TelkTibeb!`
    return encodeURIComponent(text + (quote ? ` "${quote}"` : ""))
  }

  // Copy link to clipboard
  const copyToClipboard = () => {
    const url = getShareUrl()
    const text = customMessage || `Check out "${contentTitle}" on TelkTibeb!`
    const fullText = `${text}${quote ? ` "${quote}"` : ""}\n\n${url}`

    navigator.clipboard
      .writeText(fullText)
      .then(() => {
        setIsCopied(true)

        toast({
          title: "Link copied",
          description: "The sharing link has been copied to your clipboard",
        })

        setTimeout(() => setIsCopied(false), 2000)
      })
      .catch((err) => {
        console.error("Failed to copy: ", err)
        toast({
          title: "Copy failed",
          description: "Failed to copy link to clipboard",
          variant: "destructive",
        })
      })
  }

  // Share handlers for different platforms
  const shareHandlers = {
    twitter: () => {
      const url = `https://twitter.com/intent/tweet?text=${getShareText()}&url=${encodeURIComponent(getShareUrl())}`
      window.open(url, "_blank")
      setIsDialogOpen(false)
    },
    facebook: () => {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getShareUrl())}`
      window.open(url, "_blank")
      setIsDialogOpen(false)
    },
    linkedin: () => {
      const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareUrl())}`
      window.open(url, "_blank")
      setIsDialogOpen(false)
    },
    email: () => {
      const subject = encodeURIComponent(`Check out "${contentTitle}" on TelkTibeb`)
      const body = encodeURIComponent(
        `${customMessage || `I thought you might be interested in "${contentTitle}" on TelkTibeb.`}${quote ? `\n\n"${quote}"` : ""}\n\n${getShareUrl()}`,
      )
      const url = `mailto:?subject=${subject}&body=${body}`
      window.location.href = url
      setIsDialogOpen(false)
    },
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 rounded-full">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share "{contentTitle}"</DialogTitle>
          <DialogDescription>
            Share this {contentType === "book" ? "book" : "business plan"} with others via social media or direct link.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {quote && <div className="bg-muted/50 p-3 rounded-md border text-sm italic">"{quote}"</div>}

          <div className="space-y-2">
            <label className="text-sm font-medium">Add a personal message (optional)</label>
            <Textarea
              placeholder="What did you think about this content?"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium">Share link</label>
            <div className="flex items-center space-x-2">
              <Input value={getShareUrl()} readOnly className="flex-1" />
              <Button size="icon" variant="outline" onClick={copyToClipboard}>
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy link</span>
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Share via</label>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="gap-2" onClick={shareHandlers.twitter}>
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>

              <Button variant="outline" size="sm" className="gap-2" onClick={shareHandlers.facebook}>
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>

              <Button variant="outline" size="sm" className="gap-2" onClick={shareHandlers.linkedin}>
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>

              <Button variant="outline" size="sm" className="gap-2" onClick={shareHandlers.email}>
                <Mail className="h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="sm:justify-start">
          <Button variant="secondary" onClick={copyToClipboard} className="gap-2">
            <LinkIcon className="h-4 w-4" />
            Copy Link
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

