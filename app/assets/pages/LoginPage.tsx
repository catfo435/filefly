"use client"

import { useRouter } from "next/navigation"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

import { supabase } from "../../backend/supabase";
import { passKey } from "../../backend/supabase/database.types"
import sign from "jwt-encode";
import { sha256 } from "js-sha256";

type LoginPaneProps = {
  setNewUserLogin: Dispatch<SetStateAction<boolean>>
}

export default function LoginPage(props: LoginPaneProps){

  async function onSuccessLogin(userType: "master" | passKey ){
    // var sessionToken = sign({
    //   user_name:user_name,
    //   exp: Math.floor(Date.now()/1000) + 3600, //session valid for an hour
    //   iat: Math.floor(Date.now()/1000),
    //   jti: Math.floor(Date.now()/1000).toString(),
    //   role: "authenticated"
    // },process.env.NEXT_PUBLIC_SUPABASE_SECRET!)
    // sessionStorage.setItem("sessionSecret",sessionToken)

    // const supabase = supabaseAfterLogin(sessionToken)

    function generateToken() {
      return(
        Math.random().toString(36).slice(2) +
        Math.random().toString(36)
        .toUpperCase().slice(2));
      }
    const sessionToken = generateToken()
    sessionStorage.setItem("sessionSecret",sessionToken)

    if (userType == "master"){

      const res = await supabase
      .from("loginHistory")
      .insert([{user:"master",master_user:user_name, secret:sessionToken, loginDeviceDetails:navigator.userAgent}])

      if (res.error) {
        console.error(res.error)
        return false
      }

    }
    else {
      const res = await supabase
      .from("loginHistory")
      .insert([{user:userType.caption,master_user:user_name, secret:sessionToken, loginDeviceDetails:navigator.userAgent}])

      if (res.error) {
        console.error(res.error)
        return false
      }
    }

    return true
    
  }


  async function handlePassKeyLogin(e:FormEvent<HTMLFormElement>){

    const checkPass = await supabase
      .from("users")
      .select()
      .eq("user_name",user_name!)

    const passKeysRef = checkPass.data![0].passkeys.normalPasskeys
    let passCheck = false;
    let normalUser;

    for (var i=0;i<passKeysRef.length;i++){
      if (sha256(pass!) == passKeysRef[i].passkey){
        passCheck = true;
        normalUser = passKeysRef[i]
        break;
      }
    }

    if(passCheck){
      if (!await onSuccessLogin(normalUser!)){
        alert("Something went wrong")
        setLoading(false)
        return;
      }
      sessionStorage.setItem("restrictedPrivy","enabled")
      sessionStorage.setItem("normal-user-name",normalUser!.caption)
      sessionStorage.setItem("user",user_name!);
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
      .eq("user_name",user_name!)
    
    if (!checkUser.data![0]){
      alert("No such user_name");
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
      .eq("user_name",user_name!)


      if (sha256(pass!) == checkPass.data![0].passkeys.master) {
        if (!await onSuccessLogin("master")) {
          alert("Something went wrong!")
          setLoading(false)
          return;
        } 
        sessionStorage.setItem("user",user_name!);
        sessionStorage.setItem("restrictedPrivy","disabled")
      }
      else {
        console.log(sha256(pass!));
        console.log(checkPass.data![0].passkeys.master);
        
        
        alert("Wrong pass");
        setLoading(false);
        return
      }
    }
    router.push("/masterUser")        
  }

    const router = useRouter()

    const[user_name,setUserName] = useState<string>();
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
            <input id="login_user" type="text" value={user_name} onChange={(e) => {setUserName(e.target.value)}} required/>
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
