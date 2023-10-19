"use client"

import { useRouter } from "next/navigation"
import { FormEvent, FormEventHandler } from "react"

type LoginPaneProps = {
  setNewUserLogin: Function
}

export default function LoginPane(props: LoginPaneProps){

  function handleLogin(e:FormEvent<HTMLFormElement>){
    e.preventDefault()
    localStorage.setItem("user","John Doe");
    router.push("/dashboard")        
  }

    const router = useRouter()

    return (
        <div className="loginInPane bg-slate-300 dark:bg-slate-700 w-2/3 min-[720px]:w-[480px] h-[614px] mt-20 rounded-2xl">
          <span className="my-16 flex justify-center items-center text-4xl font-bold">User Login</span>
          <div className="flex justify-center items-center">
          <form onSubmit={handleLogin}>
            <label htmlFor="login_user">Username</label>
            <input id="login_user" type="text"/>
            <br></br>
            <label htmlFor="login_pass">Password</label>
            <input id="login_pass" type="password"/>

            <br></br>

            <div className="flex justify-center items-center">
            <button className="px-2 py-2 my-5 text-xl rounded-lg hover:outline-double bg-slate-400 dark:bg-slate-500" type="submit">Login</button>
            </div>
          </form>
          </div>
          <div className="loginPaneFooter flex flex-col w-fit mx-auto">
            <span>Having Trouble Signing In?</span>
            <span className="w-fit mx-auto" onClick={() => {props.setNewUserLogin(true)}}>New User?</span>
          </div>
        </div> 
    );
}
