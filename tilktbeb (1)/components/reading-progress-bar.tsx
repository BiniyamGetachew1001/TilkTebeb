interface ReadingProgressBarProps {
  progress: number
}

export function ReadingProgressBar({ progress }: ReadingProgressBarProps) {
  return (
    <div className="w-full h-1 bg-muted mb-6 rounded-full overflow-hidden">
      <div className="h-full bg-primary transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
    </div>
  )
}

