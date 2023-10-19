"use client"
import { useRouter } from "next/navigation"
import FilesButton from "../components/FIlesButton"
import { useEffect, useState } from "react"

export default function Page() {

  const router = useRouter()
  const [userName, setUserName] = useState("NaN");
  const [auth, setAuth] = useState(false)

  useEffect(() => {
    let user = "NaN"
    if (typeof window !== "undefined" && window.localStorage){
      user = localStorage.getItem("user")!
      if (!user) {
        router.replace("/")
        return
      }
    }
    setUserName(user)
    setAuth(true);
    (document.getElementsByClassName("dashMenu")[0] as HTMLElement).hidden = false 
  },[])


  return auth && ( 
    <div className="flex-auto h-full w-full flex flex-col">
      <div className="text-4xl md:text-5xl mt-7 w-full h-fit flex justify-center">
        <span>Welcome, {userName}!</span>
      </div>
      <FilesButton />
    </div>
  )
}