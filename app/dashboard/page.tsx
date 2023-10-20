"use client"
import { useRouter } from "next/navigation"
import FilesButton from "../components/FIlesButton"
import { useEffect, useState } from "react"

export default function Page() {

  const [userName, setUserName] = useState("NaN");

  useEffect(() => {
    setUserName(localStorage.getItem("user")!)
  },[])


  return ( 
    <div className="flex-auto h-full w-full flex flex-col">
      <div className="text-4xl md:text-5xl mt-7 w-full h-fit flex justify-center">
        <span>Welcome, {userName}!</span>
      </div>
      <FilesButton />
    </div>
  )
}