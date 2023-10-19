"use client"
import { useRouter } from "next/navigation"
import FilesButton from "../components/FIlesButton"

export default function Page() {

  if (!localStorage.getItem("user")) {
    const router = useRouter()
    router.replace("/")
    return
  }

  return ( 
    <div className="flex-auto h-full w-full flex flex-col">
      <div className="text-4xl md:text-5xl mt-7 w-full h-fit flex justify-center">
        <span>Welcome, {localStorage.getItem("user")}!</span>
      </div>
      <FilesButton />
    </div>
  )
}