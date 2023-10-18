"use client"
import { FormEvent, useState } from "react";

export default function SignUpPane(){

    async function handleSubmit(e:FormEvent<HTMLFormElement>){
      e.preventDefault(); 
      if (passRepeat && pass !== passRepeat){
        alert("Passwords dont match");
        return;
      }
      alert("Account made!")  
    }

    const [pass,setPass] = useState("")
    const [passRepeat,setPassRepeat] = useState("")

    return (
        <div className="signUpPane relative bg-slate-300 dark:bg-slate-700 w-2/3 min-[720px]:w-[480px] h-[614px] mt-20 rounded-2xl">
          <div>
          <span className="my-14 flex justify-center text-4xl font-bold">Sign Up</span>
          </div>

          <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <label htmlFor="login_user">Username</label>
            <input id="login_user" type="text"/>
            <br></br>

            <div>
              <label htmlFor="login_pass">Password</label>
              <input id="login_pass" type="password" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
            </div>

            <br></br>

            <div>
              <label htmlFor="login_pass_repeat">Repeat Password</label>
              <input id="login_pass_repeat" type="password" value={passRepeat} onChange={(e) => {setPassRepeat(e.target.value)}}/>
              {(passRepeat && pass !== passRepeat)?<div className="text-xs flex justify-center text-red-500">Passwords dont match</div>:<></>}
            </div>

            <br></br>

            <div className="flex justify-center items-center">
            <button className="submitButton px-2 py-2 my-5 text-xl rounded-lg hover:outline-double bg-slate-400 dark:bg-slate-500" type="submit">Sign Up</button>
            </div>
          </form>
          </div>

        </div> 
    );
}
