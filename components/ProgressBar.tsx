import type React from "react"

type ProgressBarProps = {
  skill: string
  percentage: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ skill, percentage }) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span>{skill}</span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

