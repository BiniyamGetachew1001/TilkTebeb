"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, XCircle, Award, RotateCw, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface QuizResult {
  contentId: string
  date: string
  score: number
  totalQuestions: number
}

interface ComprehensionQuizProps {
  contentId: string
  contentTitle: string
  contentType: "book" | "businessPlan"
  onQuizAttempt?: () => void
}

// This would normally come from an API, but for demo purposes we'll generate them
const generateQuestions = (contentId: string, contentType: string): Question[] => {
  // In a real app, these would be specific to the content
  if (contentType === "book") {
    return [
      {
        id: `q1-${contentId}`,
        text: "What is the main theme of this book?",
        options: ["Personal development", "Business strategy", "Financial management", "Leadership principles"],
        correctAnswer: 1,
        explanation: "The book primarily focuses on business strategy concepts and their practical applications.",
      },
      {
        id: `q2-${contentId}`,
        text: "Which of the following best describes the author's approach?",
        options: [
          "Theoretical and academic",
          "Practical with real-world examples",
          "Philosophical and abstract",
          "Technical and detailed",
        ],
        correctAnswer: 1,
        explanation: "The author uses practical, real-world examples to illustrate key concepts.",
      },
      {
        id: `q3-${contentId}`,
        text: "According to the book, what is the most important factor for success?",
        options: [
          "Luck and timing",
          "Hard work and persistence",
          "Strategic thinking and adaptation",
          "Natural talent and intelligence",
        ],
        correctAnswer: 2,
        explanation: "The book emphasizes that strategic thinking and the ability to adapt are crucial for success.",
      },
      {
        id: `q4-${contentId}`,
        text: "Which concept is NOT discussed in the book?",
        options: ["Market positioning", "Competitive advantage", "Quantum physics", "Innovation strategies"],
        correctAnswer: 2,
        explanation: "Quantum physics is not a topic covered in this business-focused book.",
      },
      {
        id: `q5-${contentId}`,
        text: "What is the recommended first step when implementing the book's strategies?",
        options: [
          "Hiring consultants",
          "Self-assessment and goal setting",
          "Competitive analysis",
          "Financial restructuring",
        ],
        correctAnswer: 1,
        explanation:
          "The book recommends starting with self-assessment and clear goal setting before implementing other strategies.",
      },
    ]
  } else {
    // Business plan questions
    return [
      {
        id: `q1-${contentId}`,
        text: "What is the primary market segment for this business plan?",
        options: ["Large enterprises", "Small to medium businesses", "Individual consumers", "Government agencies"],
        correctAnswer: 1,
        explanation: "The business plan primarily targets small to medium businesses as its core customer base.",
      },
      {
        id: `q2-${contentId}`,
        text: "What is the estimated initial investment required?",
        options: ["Under $10,000", "$10,000 - $50,000", "$50,000 - $100,000", "Over $100,000"],
        correctAnswer: 2,
        explanation: "The business plan estimates an initial investment between $50,000 and $100,000.",
      },
      {
        id: `q3-${contentId}`,
        text: "Which of the following is NOT listed as a key risk factor?",
        options: ["Market competition", "Regulatory changes", "Natural disasters", "Economic downturn"],
        correctAnswer: 2,
        explanation: "Natural disasters are not specifically mentioned as a key risk factor in the business plan.",
      },
      {
        id: `q4-${contentId}`,
        text: "What is the projected break-even timeframe?",
        options: ["3-6 months", "6-12 months", "12-18 months", "18-24 months"],
        correctAnswer: 2,
        explanation: "The business plan projects a break-even point within 12-18 months of operation.",
      },
      {
        id: `q5-${contentId}`,
        text: "Which marketing channel is emphasized as most important?",
        options: ["Traditional advertising", "Social media", "Direct sales", "Email marketing"],
        correctAnswer: 1,
        explanation: "The business plan emphasizes social media as the most important marketing channel.",
      },
    ]
  }
}

export function ComprehensionQuiz({ contentId, contentTitle, contentType, onQuizAttempt }: ComprehensionQuizProps) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [previousResults, setPreviousResults] = useState<QuizResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Load questions and previous results
  useEffect(() => {
    const loadQuiz = () => {
      try {
        // Generate questions (in a real app, these would come from an API)
        const generatedQuestions = generateQuestions(contentId, contentType)
        setQuestions(generatedQuestions)

        // Load previous results
        const storedResults = localStorage.getItem(`quiz-results-${contentId}`)
        if (storedResults) {
          setPreviousResults(JSON.parse(storedResults))
        }
      } catch (error) {
        console.error("Error loading quiz:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadQuiz()
  }, [contentId, contentType])

  // Handle answer selection
  const handleAnswerSelect = (index: number) => {
    if (isAnswerSubmitted) return
    setSelectedAnswer(index)
  }

  // Submit answer
  const submitAnswer = () => {
    if (selectedAnswer === null) return

    const currentQuestion = questions[currentQuestionIndex]
    const isAnswerCorrect = selectedAnswer === currentQuestion.correctAnswer

    setIsAnswerSubmitted(true)
    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      setScore(score + 1)
    }

    // Call onQuizAttempt callback on first question submission
    if (currentQuestionIndex === 0 && onQuizAttempt) {
      onQuizAttempt()
    }
  }

  // Move to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setIsAnswerSubmitted(false)
    } else {
      // Quiz completed
      completeQuiz()
    }
  }

  // Complete quiz and save results
  const completeQuiz = () => {
    setQuizCompleted(true)

    const result: QuizResult = {
      contentId,
      date: new Date().toISOString(),
      score,
      totalQuestions: questions.length,
    }

    // Save result
    const updatedResults = [...previousResults, result]
    setPreviousResults(updatedResults)
    localStorage.setItem(`quiz-results-${contentId}`, JSON.stringify(updatedResults))

    // Show toast
    const percentage = Math.round((score / questions.length) * 100)
    toast({
      title: "Quiz completed!",
      description: `You scored ${score} out of ${questions.length} (${percentage}%)`,
    })
  }

  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setIsAnswerSubmitted(false)
    setIsCorrect(false)
    setScore(0)
    setQuizCompleted(false)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
        <span>Loading quiz...</span>
      </div>
    )
  }

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100)
    const isPassing = percentage >= 70

    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Quiz Results</CardTitle>
          <CardDescription>Test your understanding of "{contentTitle}"</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-center mb-4">
            <div className="bg-primary/10 rounded-full h-20 w-20 flex items-center justify-center">
              <Award className="h-10 w-10 text-primary" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-bold mb-1">{isPassing ? "Congratulations!" : "Good effort!"}</h3>
            <p className="text-muted-foreground mb-4">
              You scored {score} out of {questions.length} questions correctly.
            </p>

            <div className="mb-2">
              <Progress value={percentage} className="h-2" />
            </div>
            <p className="text-sm font-medium">
              {percentage}% {isPassing ? "Great job!" : "Keep learning!"}
            </p>
          </div>

          {previousResults.length > 1 && (
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-2">Previous Attempts</h4>
              <div className="space-y-2">
                {previousResults
                  .slice(-3)
                  .reverse()
                  .map((result, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{new Date(result.date).toLocaleDateString()}</span>
                      <span className="font-medium">
                        {result.score}/{result.totalQuestions}(
                        {Math.round((result.score / result.totalQuestions) * 100)}%)
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <Button onClick={restartQuiz} className="w-full gap-2">
            <RotateCw className="h-4 w-4" />
            Take Quiz Again
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Comprehension Quiz</CardTitle>
          <div className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
        <CardDescription>Test your understanding of "{contentTitle}"</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="mb-2">
          <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">{currentQuestion.text}</h3>

          <RadioGroup value={selectedAnswer?.toString()} className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 rounded-md border p-3 cursor-pointer ${
                  isAnswerSubmitted && index === currentQuestion.correctAnswer
                    ? "bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800"
                    : isAnswerSubmitted && index === selectedAnswer && !isCorrect
                      ? "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800"
                      : ""
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isAnswerSubmitted} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>

                {isAnswerSubmitted && index === currentQuestion.correctAnswer && (
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                )}

                {isAnswerSubmitted && index === selectedAnswer && !isCorrect && (
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                )}
              </div>
            ))}
          </RadioGroup>

          {isAnswerSubmitted && currentQuestion.explanation && (
            <div
              className={`p-3 rounded-md text-sm ${
                isCorrect
                  ? "bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                  : "bg-amber-50 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300"
              }`}
            >
              <p className="font-medium mb-1">{isCorrect ? "Correct!" : "Incorrect"}</p>
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        {!isAnswerSubmitted ? (
          <Button onClick={submitAnswer} disabled={selectedAnswer === null} className="w-full">
            Submit Answer
          </Button>
        ) : (
          <Button onClick={nextQuestion} className="w-full">
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "See Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

