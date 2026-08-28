import { useState } from "react"
import Service from "../services/Service"
import { MessageCircle } from "lucide-react"

function ReviewResponseQuestion({review,code}) {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const handleQuestions = async () => {
        if (!question.trim()) return
        try {
            
            const response = await Service(
               code,
               review,
               question,
            )
            setAnswer(response)
            setQuestion("")
        } catch (error) {
            console.log(error)
            setAnswer("Sorry i could not answer this question")
        }
    }


  return (
    <div className="mt-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#111111] p-4 shadow-sm">
  
   {/* Review questions header part */}
   <div className="flex items-center gap-2 mb-3">
    <div className="w-9 h-9 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
      <MessageCircle/>
    </div>

    <div>
      <h3 className="font-semibold text-gray-900 dark:text-white">Ask About This Review</h3>
      <p className="text-xs text-gray-500">Ask anything about the bugs, security or performance</p>
    </div>
  </div>

  {/* Input */}
  <div className="flex gap-2">
    <input
      value={question}
      onChange={(e) => setQuestion(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleQuestions()
      }}
      placeholder="Why is this code vulnerable?"
      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder:text-gray-400
        outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition"
    />

    <button
      onClick={handleQuestions}
      disabled={!question.trim()}
      className="px-5 py-3 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
    >
      Send
    </button>
  </div>

  {/* answer area */}
  {answer && (
    <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-purple-600">
          AI Response
        </span>
      </div>

      <p className="text-sm leading-6 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
        {answer}
      </p>
    </div>
  )}
</div>
  )
}

export default ReviewResponseQuestion