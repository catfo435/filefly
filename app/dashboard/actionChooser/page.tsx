"use client"
import FilesButton from "@/app/assets/components/FIlesButton"

export default function Page() {


  const selectedUser = sessionStorage.getItem("set_user")  

  return ( 
    <div className="flex-auto h-full w-full flex flex-col">
      <div className="text-4xl md:text-5xl mt-7 w-full h-fit flex justify-center">
        <span>Selected User : {selectedUser}!</span>
      </div>
      <FilesButton/>
    </div>
  )
}