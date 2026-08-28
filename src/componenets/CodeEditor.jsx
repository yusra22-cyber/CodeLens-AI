import { useState } from "react"
import Service from "../services/Service"
import { Editor } from "@monaco-editor/react";
import ReviewPanel from "./ReviewPanel";

function CodeReviewer({isDark}) {

  const [code, setCode] = useState("")
  const [review, setReview] = useState("")
  const [loading, setLoading] = useState(false)

  const handleReview = async() =>{

    if(!code.trim()) return alert("Please enter some code first!")

      setLoading(true)
      setReview("")
    try {

      const response = await Service(code)
      setReview(response)
      
    } catch (error) {

      setReview("Error: Could not retrieve code")
      console.log(error)
      
    } finally {
      setLoading(false)
    }
  }



    return(
      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen h-full">

      <div className="lg:sticky lg:top-0 lg:h-screen flex flex-col border-r border-gray-200 dark:border-[#2a2a2a]">

        <div className="flex justify-between items-center bg-white dark:bg-[#1a1a1a] px-4 lg:px-6 py-2 border-r border-b border-gray-200 dark:border-[#2a2a2a]">
          {/* heading */}
          <div className="flex items-center gap-1 lg:gap-2">
           <div className="w-3 h-3 rounded-full bg-red-500"></div>
           <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
           <div className="w-3 h-3 rounded-full bg-green-500"></div>
           <h1 className="font-semibold text-sm md:text-md lg:text-lg mx-1 lg:mx-4">Code Editor</h1>
           </div>

           {/* browse button */}
           <button onClick={handleReview} disabled={loading} className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg border border-gray-200 dark:border-[#3a3a3a] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-sm transition-all duration-300">{loading? "Analyzing...": "Analyze Code"}</button>
        </div>

        {/* input editor part */}
        <div className=" flex-1 h-full min-h-100 relative">
      <Editor
       height="100%"
       defaultLanguage="javascript"
       theme={isDark? "vs-dark" : "light"}
       value={code}
       onChange={(value)=>setCode(value)}
       options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
       }}
      />
      </div>
      </div>

      {/* code reviewer */}
      <div className="flex flex-col overflow-y-auto">
         <ReviewPanel review={review}  loading={loading} code={code}/>
      </div>
      </div>
    )
}

export default CodeReviewer;
