import { Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"

function App() {

  return (
    
    <div className="min-h-screen  min-w-full flex ">
      
      <Outlet/>

      
      <Toaster />
   </div>
  )
}

export default App
