"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trash2, Loader2, BookOpen, RotateCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Flashcard {
  id: string
  contentId: string
  front: string
  back: string
  createdAt: string
  lastReviewed?: string
  reviewCount: number
}

interface FlashcardCreatorProps {
  contentId: string
  contentTitle: string
}

export function FlashcardCreator({ contentId, contentTitle }: FlashcardCreatorProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [newFront, setNewFront] = useState("")
  const [newBack, setNewBack] = useState("")
  const [isCreating, setIsCreating] = useState(false)
  const [activeCard, setActiveCard] = useState<string | null>(null)
  const [isFlipped, setIsFlipped] = useState(false)
  const [reviewMode, setReviewMode] = useState(false)
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0)
  const { toast } = useToast()

  // Load flashcards from localStorage
  useEffect(() => {
    const loadFlashcards = () => {
      try {
        const storedFlashcards = localStorage.getItem("flashcards") || "{}"
        const allFlashcards = JSON.parse(storedFlashcards)

        // Get flashcards for this content
        const contentFlashcards = allFlashcards[contentId] || []
        setFlashcards(contentFlashcards)
      } catch (error) {
        console.error("Error loading flashcards:", error)
        setFlashcards([])
      } finally {
        setIsLoading(false)
      }
    }

    loadFlashcards()
  }, [contentId])

  // Save flashcards to localStorage
  const saveFlashcardsToStorage = (updatedFlashcards: Flashcard[]) => {
    try {
      const storedFlashcards = localStorage.getItem("flashcards") || "{}"
      const allFlashcards = JSON.parse(storedFlashcards)

      // Update flashcards for this content
      allFlashcards[contentId] = updatedFlashcards

      localStorage.setItem("flashcards", JSON.stringify(allFlashcards))
    } catch (error) {
      console.error("Error saving flashcards:", error)
    }
  }

  // Create a new flashcard
  const handleCreateFlashcard = () => {
    if (!newFront.trim() || !newBack.trim()) {
      toast({
        title: "Error",
        description: "Both front and back of the flashcard are required",
        variant: "destructive",
      })
      return
    }

    setIsCreating(true)

    try {
      const newFlashcard: Flashcard = {
        id: `flashcard-${contentId}-${Date.now()}`,
        contentId,
        front: newFront,
        back: newBack,
        createdAt: new Date().toISOString(),
        reviewCount: 0,
      }

      const updatedFlashcards = [...flashcards, newFlashcard]
      setFlashcards(updatedFlashcards)
      saveFlashcardsToStorage(updatedFlashcards)

      // Reset form
      setNewFront("")
      setNewBack("")

      toast({
        title: "Flashcard created",
        description: "Your flashcard has been created successfully",
      })
    } catch (error) {
      console.error("Error creating flashcard:", error)
      toast({
        title: "Error",
        description: "Failed to create flashcard",
        variant: "destructive",
      })
    } finally {
      setIsCreating(false)
    }
  }

  // Delete a flashcard
  const handleDeleteFlashcard = (id: string) => {
    try {
      const updatedFlashcards = flashcards.filter((card) => card.id !== id)
      setFlashcards(updatedFlashcards)
      saveFlashcardsToStorage(updatedFlashcards)

      toast({
        title: "Flashcard deleted",
        description: "Your flashcard has been deleted",
      })
    } catch (error) {
      console.error("Error deleting flashcard:", error)
      toast({
        title: "Error",
        description: "Failed to delete flashcard",
        variant: "destructive",
      })
    }
  }

  // Toggle card flip
  const toggleCardFlip = (id: string) => {
    if (activeCard === id) {
      setIsFlipped(!isFlipped)
    } else {
      setActiveCard(id)
      setIsFlipped(false)
    }
  }

  // Start review mode
  const startReview = () => {
    if (flashcards.length === 0) {
      toast({
        title: "No flashcards",
        description: "Create some flashcards first to start reviewing",
        variant: "destructive",
      })
      return
    }

    // Shuffle flashcards for review
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5)
    setFlashcards(shuffled)
    setCurrentReviewIndex(0)
    setReviewMode(true)
    setIsFlipped(false)
  }

  // Mark card as reviewed
  const markReviewed = () => {
    try {
      const updatedFlashcards = [...flashcards]
      const card = updatedFlashcards[currentReviewIndex]

      card.lastReviewed = new Date().toISOString()
      card.reviewCount = (card.reviewCount || 0) + 1

      setFlashcards(updatedFlashcards)
      saveFlashcardsToStorage(updatedFlashcards)

      // Move to next card
      if (currentReviewIndex < flashcards.length - 1) {
        setCurrentReviewIndex(currentReviewIndex + 1)
        setIsFlipped(false)
      } else {
        // End of review
        toast({
          title: "Review completed",
          description: `You've reviewed all ${flashcards.length} flashcards`,
        })
        setReviewMode(false)
      }
    } catch (error) {
      console.error("Error marking card as reviewed:", error)
    }
  }

  // Exit review mode
  const exitReview = () => {
    setReviewMode(false)
    setIsFlipped(false)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
        <span>Loading flashcards...</span>
      </div>
    )
  }

  if (reviewMode) {
    const currentCard = flashcards[currentReviewIndex]

    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">
            Reviewing Card {currentReviewIndex + 1} of {flashcards.length}
          </h3>
          <Button variant="ghost" size="sm" onClick={exitReview}>
            Exit Review
          </Button>
        </div>

        <div className="relative h-64 w-full cursor-pointer perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
          <div
            className={`absolute w-full h-full transition-transform duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
          >
            <div className="absolute w-full h-full backface-hidden bg-card border rounded-lg p-4 flex flex-col justify-center items-center">
              <p className="text-lg font-medium text-center">{currentCard.front}</p>
              <p className="text-xs text-muted-foreground mt-4">Click to flip</p>
            </div>
            <div className="absolute w-full h-full backface-hidden bg-card border rounded-lg p-4 flex flex-col justify-center items-center rotate-y-180">
              <p className="text-lg text-center">{currentCard.back}</p>
              <p className="text-xs text-muted-foreground mt-4">Click to flip back</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={() => setIsFlipped(!isFlipped)}>
            Flip Card
          </Button>
          <Button onClick={markReviewed}>
            {currentReviewIndex < flashcards.length - 1 ? "Next Card" : "Finish Review"}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Tabs defaultValue="create" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="create">Create</TabsTrigger>
        <TabsTrigger value="view">View ({flashcards.length})</TabsTrigger>
        <TabsTrigger value="review">Review</TabsTrigger>
      </TabsList>

      <TabsContent value="create" className="space-y-4 mt-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Front (Question/Term)</h3>
          <Textarea
            placeholder="Enter the question or term"
            value={newFront}
            onChange={(e) => setNewFront(e.target.value)}
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Back (Answer/Definition)</h3>
          <Textarea
            placeholder="Enter the answer or definition"
            value={newBack}
            onChange={(e) => setNewBack(e.target.value)}
            rows={3}
          />
        </div>

        <Button
          className="w-full"
          onClick={handleCreateFlashcard}
          disabled={isCreating || !newFront.trim() || !newBack.trim()}
        >
          {isCreating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Creating...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Create Flashcard
            </>
          )}
        </Button>
      </TabsContent>

      <TabsContent value="view" className="mt-4">
        {flashcards.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <h3 className="font-medium mb-1">No flashcards yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create flashcards to help you remember key concepts from "{contentTitle}".
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.querySelector('[data-value="create"]')?.click()}
            >
              Create Your First Flashcard
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {flashcards.map((card) => (
              <Card key={card.id} className="overflow-hidden">
                <div
                  className={`relative cursor-pointer ${activeCard === card.id && isFlipped ? "bg-muted/50" : ""}`}
                  onClick={() => toggleCardFlip(card.id)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">{card.front}</CardTitle>
                    {activeCard === card.id && isFlipped ? (
                      <CardDescription className="pt-2 border-t">{card.back}</CardDescription>
                    ) : (
                      <CardDescription className="text-xs italic">Click to reveal answer</CardDescription>
                    )}
                  </CardHeader>
                </div>
                <CardFooter className="flex justify-between pt-0">
                  <div className="text-xs text-muted-foreground">
                    {card.reviewCount > 0 ? <>Reviewed {card.reviewCount} times</> : <>Not reviewed yet</>}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeleteFlashcard(card.id)
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="review" className="mt-4">
        <div className="text-center py-8">
          <div className="bg-primary/10 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <RotateCw className="h-8 w-8 text-primary" />
          </div>

          <h3 className="font-medium mb-2">Ready to Review?</h3>
          <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Review your flashcards to reinforce your learning. You have {flashcards.length} flashcards for "
            {contentTitle}".
          </p>

          <Button onClick={startReview} disabled={flashcards.length === 0}>
            Start Review Session
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  )
}

