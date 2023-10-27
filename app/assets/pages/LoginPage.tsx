"use client"

import { useRouter } from "next/navigation"
import { Dispatch, FormEvent, SetStateAction, useState } from "react"

import { supabase } from "../../backend/supabase";
import { passKey } from "../../backend/supabase/database.types"

type LoginPaneProps = {
  setNewUserLogin: Dispatch<SetStateAction<boolean>>
}

export default function LoginPage(props: LoginPaneProps){


  function randomToken() {
    return(
      Math.random().toString(36).slice(2) +
      Math.random().toString(36)
      .toUpperCase().slice(2));
    }

  async function onSuccessLogin(userType: "master" | passKey ){
    const sessionToken = randomToken()
    sessionStorage.setItem("sessionSecret",sessionToken)
    if (userType == "master"){

      await supabase
      .from("loginHistory")
      .insert([{user:"master",master_user:userName, secret:sessionToken, loginDeviceDetails:navigator.userAgent}])

    }
    else {
      await supabase
      .from("loginHistory")
      .insert([{user:userType.caption,master_user:userName, secret:sessionToken, loginDeviceDetails:navigator.userAgent}])
    }
  }


  async function handlePassKeyLogin(e:FormEvent<HTMLFormElement>){

    const checkPass = await supabase
      .from("users")
      .select()
      .eq("userName",userName!)

    const passKeysRef = checkPass.data![0].passkeys.normalPasskeys
    let passCheck = false;
    let normalUser;

    for (var i=0;i<passKeysRef.length;i++){
      if (passKeysRef[i].passkey == pass){
        passCheck = true;
        normalUser = passKeysRef[i]
        break;
      }
    }

    if(passCheck){
      sessionStorage.setItem("restrictedPrivy","enabled")
      sessionStorage.setItem("normal-user-name",normalUser!.caption)
      sessionStorage.setItem("user",userName!);
      await onSuccessLogin(normalUser!)
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
        
      }
      else {
        alert("Wrong pass");
        setLoading(false);
        return
      }

      if (!OTPState){
        const signInRes = await supabase.auth.signInWithOtp({
          phone: `+91${phoneNumber}`
        })
  
        if (signInRes.error){
          if (signInRes.error.message == "Invalid login credentials"){
            alert("Invalid Credentials")
            setLoading(false)
            return;
          }
          alert("Error Occured!")
          setLoading(false)
          return;
        }
        setLoading(false)
        setOTPState(true)
        return
      }
      else {
        const verifyOTP = await supabase.auth.verifyOtp({
          phone: `+91${phoneNumber}`,
          token: OTPval,
          type:"sms"
        })
        
        if (verifyOTP.error) {
          if (verifyOTP.error.message == "Token has expired or is invalid"){
            alert("Token Expired or Invalid!")
            setOTPState(false)
            setOTPval("")
            return;
          }
          console.error(verifyOTP.error);
        }
        else {
          sessionStorage.setItem("user",userName!);
          sessionStorage.setItem("restrictedPrivy","disabled")
          onSuccessLogin("master")
        }
      }
    }
    router.push("/masterUser")        
  }

    const router = useRouter()

    const[userName,setUserName] = useState<string>();
    const[usePassKeys,setUsePassKeys] = useState(true);
    const [pass,setPass] = useState<string>()
    const [loading,setLoading] = useState(false)
    const [phoneNumber,setphoneNumber] = useState<string>()

    const [OTPState,setOTPState] = useState(false)
    const [OTPval, setOTPval] = useState("")

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

            {OTPState?<div>
              <label htmlFor="otpVerify">Enter OTP</label>
              <input id="otpVerify" type="text" value={OTPval} onChange={(e) => {setOTPval(e.target.value)}} required></input>
            </div>:
            <div hidden={usePassKeys}>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input id="phoneNumber" type="text" value={phoneNumber} onChange={(e) => {if (e.target.value.length <= 10) {setphoneNumber(e.target.value)}}} required></input>
            </div>
            }

            <span className="flex justify-center">{loading?(OTPState?"Logging In....":"Sending OTP..."):""}</span>

            <div className="flex justify-center items-center">
            <button className="px-2 py-2 my-5 text-xl rounded-lg hover:outline-double bg-slate-400 dark:bg-slate-500" type="submit">{OTPState?"Log In":"Get OTP"}</button>
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
