import { MoonIcon, SunIcon } from "lucide-react"

function Header({themeToggler, isDark}) {
  return (
    <div className="bg-white dark:bg-[#1a1a1a] text-black dark:text-white flex justify-between items-center px-4 lg:px-6 py-3 border-b border-gray-200 dark:border-[#2a2a2a]">
    
     {/* header name */}
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
      <h1 className="text-sm md:text-md lg:text-lg font-semibold tracking-tight">CodeLens AI</h1>
    </div>
 <div>

  
  <div className="flex items-center ">

   {/* toggler button */}
    <button onClick={themeToggler} className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg border border-gray-200 dark:border-[#3a3a3a] hover:bg-gray-100 dark:hover:bg-[#2a2a2a] text-sm transition-all duration-300">
    {
    isDark? 
    <div className="flex gap-2 items-center justify-center">
       <SunIcon className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500"/>
       <span className="text-sm lg:text-md">Light</span>
    </div>
    :
    <div className="flex gap-2 items-center justify-center">
      <MoonIcon className="w-4 h-4 lg:w-5 lg:h-5 text-slate-700 dark:text-slate-300"/>
      <span className="text-sm lg:text-md">Dark</span>
    </div>
    }</button>
 </div>
  
  
</div>

    </div>
  )
}

export default Header