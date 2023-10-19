"use client"
import { useRouter } from "next/navigation"
import FilesButton from "../components/FIlesButton"

export default function Page() {

  const router = useRouter()
  let userName = "NaN"

  try{
    if (!localStorage.getItem("user")) {
      router.replace("/")
      return
    }
    userName = localStorage.getItem("user")!
  }
  catch (e){
  }

  return ( 
    <div className="flex-auto h-full w-full flex flex-col">
      <div className="text-4xl md:text-5xl mt-7 w-full h-fit flex justify-center">
        <span>Welcome, {userName}!</span>
      </div>
      <FilesButton />
    </div>
  )
}