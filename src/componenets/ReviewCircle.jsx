function ReviewCircle({ number, label, color }) {
  const circumference = 213.6
  const safeNumber = number || 0
  const offset = circumference - (safeNumber / 10) * circumference

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="80" height="80" viewBox="0 0 80 80">
        {/* background circle */}
        <circle
          cx="40" cy="40" r="34"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        {/* colored arc */}
        <circle
          cx="40" cy="40" r="34"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 40 40)"
        />
        {/* number in center */}
        <text
          x="40" y="46"
          textAnchor="middle"
          fontSize="20"
          fontWeight="500"
          fill="currentColor"
        >
          {number}
        </text>
      </svg>
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
    </div>
  )
}

export default ReviewCircle