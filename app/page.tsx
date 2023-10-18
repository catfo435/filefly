import LoginPane from "./components/LoginPane"
import TitleBar from "./components/TitleBar"

export default function Page() {
  return ( 
    <div className="flex-col flex-auto h-screen w-screen">
      <TitleBar />
      <div className="fixed h-full w-full flex justify-center">
      <LoginPane />
      </div>
    </div>
  )
}