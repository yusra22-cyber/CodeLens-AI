import { useState } from "react"
import Header from "./componenets/Header"
import CodeEditor from "./componenets/CodeEditor"

function App() {

  const [ isDark, setIsDark] = useState(true)
  
  const themeToggler = () =>{
     setIsDark(!isDark)
  }

  return (
    <div className={isDark?"dark":""}>
      <div className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white min-h-screen">
       <Header themeToggler={themeToggler} isDark={isDark}/>
       <CodeEditor isDark={isDark} />
      </div>
    </div>
    
  )
}

export default App
