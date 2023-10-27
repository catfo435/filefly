"use client"
import {  FormEvent, useState } from "react";
import { supabase } from "../../backend/supabase";

type SignUpPageProps = {
  setPassKeys : Function
}

export default function SignUpPage(props: SignUpPageProps){   


    function randomPassword() {
    return(
      Math.random().toString(36).slice(2) +
      Math.random().toString(36)
      .toUpperCase().slice(2));
    }

    async function handleSubmit(e:FormEvent<HTMLFormElement>){
      e.preventDefault(); 


      if (passRepeat && pass !== passRepeat){
        alert("Passwords dont match");
        return;
      }

      try {

      if (!OTPState){

        const signUpRes = await supabase.auth.signUp({
        password: pass!,
        phone: `+91${phoneNumber}`
      })

      if (signUpRes.error){
        if (signUpRes.error?.message == "User already registered"){
          alert("Already Registered!")
          return;
        }
        alert("Error Occured!")
        return;
      }

      setOTPState(true)
      return

      }

      else{
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
      }
        
      const passKeys = {
        master : pass!,
        normalPasskeys:[
          {id:1,passkey:randomPassword(),caption:"normal-user-1"},
          {id:2,passkey:randomPassword(),caption:"normal-user-2"},
          {id:3,passkey:randomPassword(),caption:"normal-user-3"},
          {id:4,passkey:randomPassword(),caption:"normal-user-4"},
          {id:5,passkey:randomPassword(),caption:"normal-user-5"},
          {id:6,passkey:randomPassword(),caption:"normal-user-6"}
        ]
      }

      await supabase
      .from("users")
      .insert([{userName:userName!,passkeys:passKeys}])

      props.setPassKeys(passKeys)
      return;
    }  
      catch(e){
        alert("Error!")
        console.error(e);
      }
    }

    const[userName,setUserName] = useState<string>();
    const [pass,setPass] = useState<string>("")
    const [passRepeat,setPassRepeat] = useState<string>()
    const [phoneNumber,setphoneNumber] = useState<string>()

    const [OTPState,setOTPState] = useState(false)
    const [OTPval, setOTPval] = useState("")

    return (
        <div className="signUpPane relative bg-slate-300 dark:bg-slate-700 w-2/3 min-[720px]:w-[480px] h-[650px] mt-20 rounded-2xl">
          <div>
          <span className="my-10 flex justify-center text-4xl font-bold">Sign Up</span>
          </div>

          <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit}>
            <label htmlFor="login_user">Username</label>
            <input id="login_user" type="text" value={userName} onChange={(e) => {setUserName(e.target.value)}} required/>
            <br></br>

            <div>
              <label htmlFor="login_pass">Password</label>
              <input id="login_pass" type="password" value={pass} onChange={(e) => {setPass(e.target.value)}} required/>
            </div>

            <br></br>

            <div>
              <label htmlFor="login_pass_repeat">Repeat Password</label>
              <input id="login_pass_repeat" type="password" value={passRepeat} onChange={(e) => {setPassRepeat(e.target.value)}} required/>
              <div className="text-xs flex justify-center text-red-500">{(pass!.length<=6 && pass)?"Password should be atleast 6 characters":((!passRepeat || pass !== passRepeat) && pass)?"Passwords dont match":""}</div>
            </div>

            {OTPState?<div>
              <label htmlFor="otpVerify">Enter OTP</label>
              <input id="otpVerify" type="text" value={OTPval} onChange={(e) => {setOTPval(e.target.value)}} required></input>
            </div>:
            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input id="phoneNumber" type="text" value={phoneNumber} onChange={(e) => {if (e.target.value.length <= 10) {setphoneNumber(e.target.value)}}} required></input>
            </div>
            }

            <div className="flex justify-center items-center">
            <button className="submitButton px-2 py-2 my-5 text-xl rounded-lg hover:outline-double bg-slate-400 dark:bg-slate-500" type="submit">{OTPState?"Sign Up":"Get OTP"}</button>
            </div>
            <div className="loginPaneFooter flex flex-col w-fit mx-auto">
            <span className="w-fit mx-auto" onClick={() => {sessionStorage.clear();window.location.href = "/"}}>Already A User? Login In</span>
          </div>  
          </form>
          </div>

        </div> 
    );
}
