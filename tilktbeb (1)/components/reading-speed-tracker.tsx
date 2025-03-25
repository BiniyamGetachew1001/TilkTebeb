"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Timer, BarChart2, Award, Zap } from "lucide-react"

interface ReadingSpeedTrackerProps {
  contentId: string
  contentLength: number // Approximate word count
}

interface ReadingSession {
  id: string
  contentId: string
  startTime: string
  endTime?: string
  wordsRead: number
  wordsPerMinute?: number
}

export function ReadingSpeedTracker({ contentId, contentLength }: ReadingSpeedTrackerProps) {
  const [isTracking, setIsTracking] = useState(false)
  const [currentSession, setCurrentSession] = useState<ReadingSession | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [readingSessions, setReadingSessions] = useState<ReadingSession[]>([])
  const [averageWpm, setAverageWpm] = useState<number | null>(null)
  const [bestWpm, setBestWpm] = useState<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Load previous reading sessions
  useEffect(() => {
    const loadSessions = () => {
      try {
        const storedSessions = localStorage.getItem(`reading-sessions-${contentId}`)
        if (storedSessions) {
          const sessions = JSON.parse(storedSessions)
          setReadingSessions(sessions)

          // Calculate stats
          if (sessions.length > 0) {
            const completedSessions = sessions.filter((s: ReadingSession) => s.wordsPerMinute)

            if (completedSessions.length > 0) {
              // Calculate average WPM
              const totalWpm = completedSessions.reduce(
                (sum: number, session: ReadingSession) => sum + (session.wordsPerMinute || 0),
                0,
              )
              setAverageWpm(Math.round(totalWpm / completedSessions.length))

              // Find best WPM
              const best = Math.max(...completedSessions.map((s: ReadingSession) => s.wordsPerMinute || 0))
              setBestWpm(best)
            }
          }
        }
      } catch (error) {
        console.error("Error loading reading sessions:", error)
      }
    }

    loadSessions()
  }, [contentId])

  // Start tracking reading speed
  const startTracking = () => {
    const session: ReadingSession = {
      id: `session-${contentId}-${Date.now()}`,
      contentId,
      startTime: new Date().toISOString(),
      wordsRead: 0,
    }

    setCurrentSession(session)
    setIsTracking(true)
    setElapsedTime(0)

    // Start timer
    timerRef.current = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)
  }

  // Stop tracking and calculate reading speed
  const stopTracking = () => {
    if (!currentSession) return

    // Clear timer
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    // Calculate words per minute
    const endTime = new Date().toISOString()
    const startTimeMs = new Date(currentSession.startTime).getTime()
    const endTimeMs = new Date(endTime).getTime()
    const minutesElapsed = (endTimeMs - startTimeMs) / (1000 * 60)

    // Assume the user read the entire content
    const wordsPerMinute = Math.round(contentLength / minutesElapsed)

    // Update session
    const completedSession: ReadingSession = {
      ...currentSession,
      endTime,
      wordsRead: contentLength,
      wordsPerMinute,
    }

    // Save to local storage
    const updatedSessions = [...readingSessions, completedSession]
    setReadingSessions(updatedSessions)
    localStorage.setItem(`reading-sessions-${contentId}`, JSON.stringify(updatedSessions))

    // Update stats
    if (!averageWpm) {
      setAverageWpm(wordsPerMinute)
    } else {
      const totalWpm = readingSessions.reduce((sum, session) => sum + (session.wordsPerMinute || 0), 0) + wordsPerMinute
      setAverageWpm(Math.round(totalWpm / (readingSessions.length + 1)))
    }

    if (!bestWpm || wordsPerMinute > bestWpm) {
      setBestWpm(wordsPerMinute)
    }

    // Reset tracking state
    setIsTracking(false)
    setCurrentSession(null)
  }

  // Format time as mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Timer className="h-5 w-5 text-primary" />
          Reading Speed Tracker
        </CardTitle>
        <CardDescription>Track your reading speed to improve comprehension and efficiency</CardDescription>
      </CardHeader>

      <CardContent>
        {isTracking ? (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">Time Elapsed</div>
              <div className="text-lg font-mono">{formatTime(elapsedTime)}</div>
            </div>

            <Progress value={100} className="h-2" />

            <p className="text-sm text-muted-foreground text-center">Reading in progress...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-muted/40 p-3 rounded-lg text-center">
              <div className="flex justify-center mb-1">
                <BarChart2 className="h-5 w-5 text-primary" />
              </div>
              <div className="text-lg font-semibold">{averageWpm ? `${averageWpm} WPM` : "N/A"}</div>
              <div className="text-xs text-muted-foreground">Average Speed</div>
            </div>

            <div className="bg-muted/40 p-3 rounded-lg text-center">
              <div className="flex justify-center mb-1">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div className="text-lg font-semibold">{bestWpm ? `${bestWpm} WPM` : "N/A"}</div>
              <div className="text-xs text-muted-foreground">Best Speed</div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        {isTracking ? (
          <Button variant="outline" className="w-full" onClick={stopTracking}>
            I've Finished Reading
          </Button>
        ) : (
          <Button className="w-full" onClick={startTracking}>
            <Zap className="h-4 w-4 mr-2" />
            Start Tracking
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

