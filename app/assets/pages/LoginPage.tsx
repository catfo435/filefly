"use client"

import { useRouter } from "next/navigation"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

import { supabase } from "../../backend/supabase";
import { passKey } from "../../backend/supabase/database.types"

type LoginPaneProps = {
  setNewUserLogin: Dispatch<SetStateAction<boolean>>
}

export default function LoginPage(props: LoginPaneProps){


  async function onSuccessLogin(userType: "master" | passKey ){
    if (userType == "master"){

      await supabase
      .from("loginHistory")
      .insert([{user:"master",master_user:userName}])

    }
    else {
      await supabase
      .from("loginHistory")
      .insert([{user:userType.caption,master_user:userName}])
    }
  }


  async function handlePassKeyLogin(e:FormEvent<HTMLFormElement>){

    const checkPass = await supabase
      .from("users")
      .select()
      .eq("userName",userName!)

    const passKeysRef = checkPass.data![0].passkeys.normalPasskeys
    let passCheck = false;
    let normalUserIndex = 7;

    for (var i=0;i<passKeysRef.length;i++){
      if (passKeysRef[i].passkey == pass){
        passCheck = true;
        normalUserIndex = i+1;
        break;
      }
    }

    if(passCheck){
      sessionStorage.setItem("restrictedPrivy","enabled")
      sessionStorage.setItem("userIndex",normalUserIndex!.toString())
      sessionStorage.setItem("user",userName!);
      await onSuccessLogin(passKeysRef[normalUserIndex-1])
      router.push("/dashboard") 
    }
    else {
      alert("Passkey not found!")
      setLoading(false);
      return;
    }

  }

  async function handleLogin(e:FormEvent<HTMLFormElement>){
    e.preventDefault()

    setLoading(true);

    const checkUser = await supabase
      .from("users")
      .select()
      .eq("userName",userName!)
    
    if (!checkUser.data![0]){
      alert("No such username");
      setUserName("")
      setPass("")
      setLoading(false)
      return;
    }
    else {

      if (usePassKeys) {
        await handlePassKeyLogin(e)
        return;
      }

      const checkPass = await supabase
      .from("users")
      .select()
      .eq("userName",userName!)


      if (checkPass.data![0].passkeys.master == pass) {
        sessionStorage.setItem("user",userName!);
        sessionStorage.setItem("userIndex","master")
        sessionStorage.setItem("restrictedPrivy","disabled")
        onSuccessLogin("master")
      }
      else {
        alert("Wrong pass");
        setLoading(false);
        return
      }
    }
    router.push("/masterUser")        
  }

    const router = useRouter()

    const[userName,setUserName] = useState<string>();
    const[usePassKeys,setUsePassKeys] = useState(true);
    const [pass,setPass] = useState<string>()
    const [loading,setLoading] = useState(false)

    return (
        <div className="loginInPane bg-slate-300 dark:bg-slate-700 w-2/3 min-[720px]:w-[480px] h-[614px] mt-20 rounded-2xl">
          <span className="mt-16 mb-10 flex justify-center items-center text-4xl font-bold">User Login</span>
          <span className="flex my-6 justify-center items-center text-xl">{!usePassKeys?"Under Master Privileges":""}</span>
          <div className="flex justify-center items-center">
          <form onSubmit={handleLogin}>
            <label htmlFor="login_user">Username</label>
            <input id="login_user" type="text" value={userName} onChange={(e) => {setUserName(e.target.value)}} required/>
            <br></br>
            <label htmlFor="login_pass">{usePassKeys?"PassKey":"Password"}</label>
            <input id="login_pass" type="password" value={pass} onChange={(e) => {setPass(e.target.value)}} required/>

            <br></br>

            <span className="flex justify-center">{loading?"Logging In....":""}</span>

            <div className="flex justify-center items-center">
            <button className="px-2 py-2 my-5 text-xl rounded-lg hover:outline-double bg-slate-400 dark:bg-slate-500" type="submit">Login</button>
            </div>
          </form>
          </div>
          <div className="loginPaneFooter flex flex-col w-fit mx-auto">
            <span onClick={() => {setUsePassKeys(!usePassKeys)}}>{usePassKeys?"Use Master Key?":"Use Passkeys?"}</span>
            <span className="w-fit mx-auto" onClick={() => {props.setNewUserLogin(true)}}>New User?</span>
          </div>
        </div> 
    );
}
