import CodeEditor from "./Components/CodeEditorFrame/CodeEditorFrame"
import Navbar from "./Components/Navbar/Navbar"

function App() {

  return (
    <div className="flex flex-col bg-[#1a1a1a] poppins-medium">
      <Navbar/>
      
      <div className="w-full poppins-bold text-white px-16 flex flex-col items-center gap-5">

        <h1 className="text-[96px] mt-10">
          &lt; Build your stuff &gt;
        </h1>
        
        <div className="flex flex-row gap-5">
          <button className="px-10 py-2 bg-white text-black rounded-md poppins-medium">Practice</button>
          <button className="px-10 py-2 bg-white text-black rounded-md poppins-medium">Compete</button>
        </div>
        
        <div className="w-[80%] h-[1000px] bg-red-300 mt-10">
          {/* <iframe src="https://leetcode-ide.vercel.app/" style={{ border: '1px', borderColor: '#777' }} width={'600'} height="350" frameBorder="0" scrolling="no"></iframe> */}
          <CodeEditor/>
        </div>
      
      </div>
    
    </div>
  )
}

export default App
