"use client"
import { useRouter } from "next/navigation"
import FilesButton from "../components/FIlesButton"

export default function Page() {

  const router = useRouter()

  try{
    if (!localStorage.getItem("user")) {
      router.replace("/")
      return
    }
  }
  catch (e){
  }

  return ( 
    <div className="flex-auto h-full w-full flex flex-col">
      <div className="text-4xl md:text-5xl mt-7 w-full h-fit flex justify-center">
        <span>Welcome, {window ? localStorage.getItem("user"): "NaN"}!</span>
      </div>
      <FilesButton />
    </div>
  )
}