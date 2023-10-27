"use client"
import { FormEvent, useEffect, useState } from "react"

export default function Page() {

  const [userName, setUserName] = useState<string>();
  const [userNameReceipient, setuserNameReceipient] = useState<string>();

  useEffect(() => { 
    setUserName(sessionStorage.getItem("user")!)
  },[])


  function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if (userNameReceipient == userName){
      alert("Cant send files to yourself")
      return;
    }
    if (!userNameReceipient) {
      alert("Please enter a username");
      return;
    }
    else {
      sessionStorage.setItem('set_user', userNameReceipient);
      window.location.href = "/dashboard/actionChooser" 
    }
  }


  return ( 
    <div className="flex-auto h-full w-full flex flex-col items-center">
      <div className="flex-initial text-4xl md:text-5xl mt-7 w-full h-fit flex justify-center">
        <span>Welcome, {userName}!</span>
      </div>
      <div className="flex-auto flex justify-center items-center">
      <div className="flex flex-col items-center justify-center text-5xl bg-[#D6DEE8] dark:bg-[#162032] h-3/4 rounded-3xl">
        Select User   
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center w-full">
          <input className="rounded-3xl h-20 mt-10 px-5 py-5 w-3/4" value={userNameReceipient} onChange={(e) => {setuserNameReceipient(e.target.value)}}></input>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}