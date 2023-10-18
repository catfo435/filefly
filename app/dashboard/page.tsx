"use client"
import { useSearchParams } from "next/navigation"
import FilesButton from "../components/FIlesButton"

export default function Page() {

  const searchParams = useSearchParams()

  return ( 
    <div className="flex-auto h-full w-full flex flex-col">
      <div className="text-4xl md:text-5xl mt-7 w-full h-fit flex justify-center">
        <span>Welcome, {searchParams.get("name")}!</span>
      </div>
      <FilesButton />
    </div>
  )
}