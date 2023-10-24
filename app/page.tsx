"use client"
import { useEffect, useState } from "react"
import LoginPane from "./components/LoginPane"
import SignUpPane from "./components/SignUpPane"
import { useRouter } from "next/navigation"

export default function Page() {


  const [newUserLogin,setNewUserLogin] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      router.replace("/dashboard")
    }
  },[])

  return ( 
    <div className="flex-auto flex justify-center">
      {newUserLogin?<SignUpPane />:<LoginPane setNewUserLogin={setNewUserLogin}/>}
    </div>
  )
}