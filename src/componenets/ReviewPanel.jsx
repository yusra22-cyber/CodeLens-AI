import { Bug, Lightbulb, ShieldAlert, Zap } from "lucide-react"
import ReviewCircle from "./ReviewCircle"
import ReviewResponseQuestion from "./ReviewResponseQuestion"

function ReviewPanel({review,loading,code}) {
  return (
    <div className="w-full mx-auto min-h-screen flex flex-col mt-2 md:mt-auto">

      <div className="flex items-center bg-white dark:bg-[#1a1a1a] px-6 py-4 border-r border-b border-gray-200 dark:border-[#2a2a2a]">
          {/* heading */}
           <h1 className="font-semibold text-md mx-4">AI Review</h1>
      </div>


      
      {loading && (
        <div className="flex flex-col mt-50 justify-center items-center gap-3">
            <div className="h-full flex items-center justify-center text-zinc-400 text-sm animate-pulse">
              Analyzing the code...
            </div>
            <div className="flex justify-center items-center gap-2">
               <div className="w-3 h-3 rounded-full bg-red-500 animate-bounce transition-all duration-300"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500 animate-bounce transition-all duration-300" style={{ animationDelay: "0.2s" }}></div>
               <div className="w-3 h-3 rounded-full bg-green-500 animate-bounce transition-all duration-300" style={{ animationDelay: "0.3s" }}></div>
            </div>
        </div>
        )}


        
      {!loading && !review && (
          <div className="min-h-screen flex items-start mt-20 justify-center text-zinc-400 text-sm italic">
             <h1 className="text-center"> Drop your code and uncover bugs, improvements, and optimizations.</h1>
          </div>
      )}

      {!loading && review && (
        <div className="flex flex-col gap-1 ">
          {/* showing the graph result */}
      <div className="flex gap-6 justify-center p-4 border-b border-gray-200 mb-5">
      <ReviewCircle number={review?.bugs} label="Bugs" color="#E24B4A" />
      <ReviewCircle number={review?.warnings} label="Warnings" color="#EF9F27" />
      <ReviewCircle number={review?.tips} label="Tips" color="#85B7EB" />
      </div>


      {/* showings bugs */}

      {review?.details?.bugs_and_flaws && (
       <div className="bg-red-50 dark:bg-[#1a1a1a] border border-red-200 dark:border-[#3a0a0a] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-red-500 mb-2 flex items-center gap-2">
         <Bug className="w-5 h-5" /> Bugs & Flaws
       </h3>
       <pre className="text-sm bg-[#0f0f0f] text-red-300 p-4 rounded-lg whitespace-pre-wrap overflow-x-auto">
       <code>{review.details.bugs_and_flaws}</code>
      </pre>
     </div>
      )}

      {/* security part */}

     {review?.details?.security_issues && (
      <div className="bg-orange-50 dark:bg-[#1a1a1a] border border-orange-200 dark:border-[#4a2800] rounded-lg p-4">
        <h3 className="text-sm font-semibold text-orange-500 mb-2 flex items-center gap-2">
        <ShieldAlert className="w-5 h-5" /> Security Issues
        </h3>
        <pre className="text-sm bg-[#0f0f0f] text-orange-300 p-4 rounded-lg whitespace-pre-wrap overflow-x-auto">
        <code>{review.details.security_issues}</code>
        </pre>
      </div>
     )}

      {/* performance section */}
     
      {review?.details?.performance && (
       <div className="bg-blue-50 dark:bg-[#1a1a1a] border border-blue-200 dark:border-[#0a2340] rounded-lg p-4">
         <h3 className="text-sm font-semibold text-blue-500 mb-2 flex items-center gap-2">
         <Zap className="w-5 h-5" /> Performance Improvements
         </h3>
        <pre className="text-sm bg-[#0f0f0f] text-blue-300 p-4 rounded-lg whitespace-pre-wrap overflow-x-auto">
        <code>{review.details.performance}</code>
        </pre>
       </div>
      )}


       {review?.details?.refactored_code && (
        <div className="bg-green-50 dark:bg-[#1a1a1a] border border-green-200 dark:border-[#0a3a1a] rounded-lg p-4">
          <h3 className="text-sm font-semibold text-green-500 mb-2 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500"/> Refactored Code
          </h3>
          <pre className="text-sm bg-[#0f0f0f] text-green-300 p-4 rounded-lg whitespace-pre-wrap font-mono overflow-x-auto">
          <code>{review.details.refactored_code}</code>
         </pre>
        </div>
       )}

       <ReviewResponseQuestion review={review} code={code}/>
</div>

      )}

      

    </div>
  )
}

export default ReviewPanel
