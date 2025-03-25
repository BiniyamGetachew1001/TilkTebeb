"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Settings } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface TextToSpeechPlayerProps {
  text: string
  onPlayingChange?: (isPlaying: boolean) => void
}

export function TextToSpeechPlayer({ text, onPlayingChange }: TextToSpeechPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(1)
  const [rate, setRate] = useState("1")
  const [voice, setVoice] = useState("")
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([])
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [sentences, setSentences] = useState<string[]>([])
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const previousVolumeRef = useRef(1)

  // Split text into sentences
  useEffect(() => {
    if (!text) return

    // Simple sentence splitting - in a real app, this would be more sophisticated
    const sentenceArray = text
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .split(/(?<=[.!?])\s+/)
      .filter((sentence) => sentence.trim().length > 0)

    setSentences(sentenceArray)
  }, [text])

  // Initialize speech synthesis and get available voices
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) return

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices()
      setAvailableVoices(voices)

      // Set default voice (prefer English)
      if (voices.length > 0) {
        const englishVoice = voices.find((voice) => voice.lang.includes("en"))
        setVoice(englishVoice?.name || voices[0].name)
      }
    }

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    loadVoices()

    // Cleanup
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel()
      }
    }
  }, [])

  // Handle play/pause
  const togglePlayPause = () => {
    if (!window.speechSynthesis) return

    if (isPlaying) {
      if (isPaused) {
        window.speechSynthesis.resume()
        setIsPaused(false)
      } else {
        window.speechSynthesis.pause()
        setIsPaused(true)
      }
    } else {
      playSentence(currentSentenceIndex)
    }
  }

  // Play a specific sentence
  const playSentence = (index: number) => {
    if (!window.speechSynthesis || !sentences[index]) return

    // Cancel any ongoing speech
    window.speechSynthesis.cancel()

    // Create utterance
    const utterance = new SpeechSynthesisUtterance(sentences[index])
    utteranceRef.current = utterance

    // Set voice
    if (voice) {
      const selectedVoice = availableVoices.find((v) => v.name === voice)
      if (selectedVoice) utterance.voice = selectedVoice
    }

    // Set rate and volume
    utterance.rate = Number.parseFloat(rate)
    utterance.volume = isMuted ? 0 : volume

    // Handle end of sentence
    utterance.onend = () => {
      if (index < sentences.length - 1) {
        // Play next sentence
        setCurrentSentenceIndex(index + 1)
        playSentence(index + 1)
      } else {
        // End of text
        setIsPlaying(false)
        setCurrentSentenceIndex(0)
        if (onPlayingChange) onPlayingChange(false)
      }
    }

    // Handle errors
    utterance.onerror = (event) => {
      console.error("Speech synthesis error:", event)
      setIsPlaying(false)
      if (onPlayingChange) onPlayingChange(false)
    }

    // Start speaking
    window.speechSynthesis.speak(utterance)
    setIsPlaying(true)
    setIsPaused(false)
    setCurrentSentenceIndex(index)

    if (onPlayingChange) onPlayingChange(true)
  }

  // Stop speaking
  const stopSpeaking = () => {
    if (!window.speechSynthesis) return

    window.speechSynthesis.cancel()
    setIsPlaying(false)
    setIsPaused(false)
    setCurrentSentenceIndex(0)

    if (onPlayingChange) onPlayingChange(false)
  }

  // Skip to next sentence
  const nextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      playSentence(currentSentenceIndex + 1)
    }
  }

  // Skip to previous sentence
  const previousSentence = () => {
    if (currentSentenceIndex > 0) {
      playSentence(currentSentenceIndex - 1)
    }
  }

  // Toggle mute
  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolumeRef.current)
      setIsMuted(false)

      if (utteranceRef.current && isPlaying) {
        utteranceRef.current.volume = previousVolumeRef.current
      }
    } else {
      previousVolumeRef.current = volume
      setVolume(0)
      setIsMuted(true)

      if (utteranceRef.current && isPlaying) {
        utteranceRef.current.volume = 0
      }
    }
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    setIsMuted(newVolume === 0)

    if (utteranceRef.current && isPlaying) {
      utteranceRef.current.volume = newVolume
    }
  }

  // Handle rate change
  const handleRateChange = (value: string) => {
    setRate(value)

    if (isPlaying) {
      // Restart current sentence with new rate
      playSentence(currentSentenceIndex)
    }
  }

  // Handle voice change
  const handleVoiceChange = (value: string) => {
    setVoice(value)

    if (isPlaying) {
      // Restart current sentence with new voice
      playSentence(currentSentenceIndex)
    }
  }

  if (!window.speechSynthesis) {
    return (
      <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md">
        <p className="text-amber-800 dark:text-amber-300">Text-to-speech is not supported in your browser.</p>
      </div>
    )
  }

  return (
    <div className="bg-muted/30 rounded-md p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-medium">{isPlaying ? "Now reading..." : "Text-to-Speech"}</div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Voice</label>
                  </div>
                  <Select value={voice} onValueChange={handleVoiceChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableVoices.map((v) => (
                        <SelectItem key={v.name} value={v.name}>
                          {v.name} ({v.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Speed</label>
                  </div>
                  <Select value={rate} onValueChange={handleRateChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select speed" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5x (Slow)</SelectItem>
                      <SelectItem value="0.75">0.75x</SelectItem>
                      <SelectItem value="1">1x (Normal)</SelectItem>
                      <SelectItem value="1.25">1.25x</SelectItem>
                      <SelectItem value="1.5">1.5x</SelectItem>
                      <SelectItem value="2">2x (Fast)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleMute}>
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
          </Button>
        </div>
      </div>

      {isPlaying && (
        <div className="mb-4 text-sm bg-background/50 p-3 rounded border">
          <p className="line-clamp-2">{sentences[currentSentenceIndex]}</p>
          <div className="text-xs text-muted-foreground mt-1">
            Sentence {currentSentenceIndex + 1} of {sentences.length}
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-2 mb-4">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={previousSentence}
          disabled={!isPlaying || currentSentenceIndex === 0}
        >
          <SkipBack className="h-4 w-4" />
          <span className="sr-only">Previous sentence</span>
        </Button>

        <Button
          variant={isPlaying ? "secondary" : "default"}
          size="icon"
          className="h-10 w-10 rounded-full"
          onClick={togglePlayPause}
        >
          {isPlaying && !isPaused ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          <span className="sr-only">{isPlaying ? (isPaused ? "Resume" : "Pause") : "Play"}</span>
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={nextSentence}
          disabled={!isPlaying || currentSentenceIndex === sentences.length - 1}
        >
          <SkipForward className="h-4 w-4" />
          <span className="sr-only">Next sentence</span>
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <VolumeX className="h-3 w-3 text-muted-foreground" />
          <Slider value={[volume]} min={0} max={1} step={0.01} onValueChange={handleVolumeChange} className="flex-1" />
          <Volume2 className="h-3 w-3 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}

