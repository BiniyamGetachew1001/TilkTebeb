interface SectionDividerProps {
  position?: "top" | "bottom"
  className?: string
}

export function SectionDivider({ position = "bottom", className = "" }: SectionDividerProps) {
  return (
    <div className={`section-divider ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          transform: position === "top" ? "rotate(180deg)" : "rotate(0deg)",
          [position]: 0,
        }}
      >
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" />
      </svg>
    </div>
  )
}

