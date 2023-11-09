"use client"
import { FormEvent, useEffect, useState } from "react"

export default function Page() {

  const [user_name, setUserName] = useState<string>();
  const [user_nameReceipient, setUserNameReceipient] = useState<string>();

  useEffect(() => { 
    setUserName(sessionStorage.getItem("user")!)
  },[])


  function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    if (user_nameReceipient == user_name){
      alert("Cant send files to yourself")
      return;
    }
    if (!user_nameReceipient) {
      alert("Please enter a user_name");
      return;
    }
    else {
      sessionStorage.setItem('set_user', user_nameReceipient);
      window.location.href = "/dashboard/actionChooser" 
    }
  }


  return ( 
    <div className="flex-auto h-full w-full flex flex-col items-center">
      <div className="flex-initial text-4xl md:text-5xl mt-7 w-full h-fit flex justify-center">
        <span>Welcome, {user_name}!</span>
      </div>
      <div className="flex-auto flex justify-center items-center">
      <div className="flex flex-col items-center justify-center text-5xl bg-[#D6DEE8] dark:bg-[#162032] h-3/4 rounded-3xl">
        Select User   
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center items-center w-full">
          <input className="rounded-3xl h-20 mt-10 px-5 py-5 w-3/4" value={user_nameReceipient} onChange={(e) => {setUserNameReceipient(e.target.value)}}></input>
          </div>
        </form>
      </div>
      </div>
    </div>
  )
}