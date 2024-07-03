import Login from "./components/Login"
import Side from "./components/Side"
import Workers from "./components/Workers"

function App() {

  return (
    <div className="min-h-screen  min-w-full flex ">
      <Side />
      <div className="displayer p-8 w-full ">
        <Workers />
      </div>
   </div>
  )
}

export default App
