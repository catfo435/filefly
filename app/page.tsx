"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import SignUpPage from "./assets/pages/SignUpPage"
import LoginPage from "./assets/pages/LoginPage"
import ShowPassKeys from "./assets/pages/ShowPassKeys"
import { passKeyJson } from "./backend/supabase/database.types"

export default function Page() {

  const [newUserLogin,setNewUserLogin] = useState(false)
  const [PassKeys, setPassKeys] = useState<passKeyJson>()
  const router = useRouter()

  useEffect(() => {
    if (sessionStorage.getItem("user")) {
      router.replace("/dashboard")
    }
  },[])


  return ( 
    <div className="flex-auto flex justify-center">
      {newUserLogin?(PassKeys?<ShowPassKeys {...PassKeys}/>:<SignUpPage setPassKeys={setPassKeys} />):<LoginPage setNewUserLogin={setNewUserLogin}/>}
    </div>
  )
}