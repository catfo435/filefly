"use client"

import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

import { doc, getDoc} from "firebase/firestore"; 
import { firebaseDB } from "../backend";

type LoginPaneProps = {
  setNewUserLogin: Function
}

export default function LoginPane(props: LoginPaneProps){

  async function handleLogin(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    const usersRef = doc(firebaseDB,"users",userName!)
    const passRef = doc(firebaseDB,"passkeys",userName!)

    const usersSnap = await getDoc(usersRef);
    
    if (!usersSnap.exists()){
      alert("No such username");
      setUserName("")
      setPass("")
      return;
    }
    else {
      const passSnap = await getDoc(passRef);
      if (passSnap.data()!.master == pass) {
        sessionStorage.setItem("user",userName!);
      }
    }
    router.push("/dashboard")        
  }

    const router = useRouter()

    const[userName,setUserName] = useState<string>();
    const [pass,setPass] = useState<string>()

    return (
        <div className="loginInPane bg-slate-300 dark:bg-slate-700 w-2/3 min-[720px]:w-[480px] h-[614px] mt-20 rounded-2xl">
          <span className="my-16 flex justify-center items-center text-4xl font-bold">User Login</span>
          <div className="flex justify-center items-center">
          <form onSubmit={handleLogin}>
            <label htmlFor="login_user">Username</label>
            <input id="login_user" type="text" value={userName} onChange={(e) => {setUserName(e.target.value)}} required/>
            <br></br>
            <label htmlFor="login_pass">Password</label>
            <input id="login_pass" type="password" value={pass} onChange={(e) => {setPass(e.target.value)}} required/>

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
