import LoginPane from "./components/LoginPane"
import TitleBar from "./components/TitleBar"

export default function Page() {
  return ( 
    <div>
      <TitleBar />
      <div className="static h-screen w-screen flex justify-center items-center">
      <LoginPane />
    </div>
    </div>
  )
}