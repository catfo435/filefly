"use client"
import { useState } from "react"
import LoginPane from "./components/LoginPane"
import SignUpPane from "./components/SignUpPane"

export default function Page() {


  const [newUserLogin,setNewUserLogin] = useState(false)

  return ( 
    <div className="flex-auto flex justify-center">
      {newUserLogin?<SignUpPane />:<LoginPane setNewUserLogin={setNewUserLogin}/>}
    </div>
  )
}