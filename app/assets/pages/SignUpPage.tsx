"use client"
import { FormEvent, useState } from "react";
import { supabase } from "../../backend/supabase";

export default function SignUpPage(){   


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


              
      const passKeys = {
        master : pass!,
        n1 : randomPassword(),
        n2 : randomPassword(),
        n3 : randomPassword(),
        n4 : randomPassword(),
        n5 : randomPassword(),
        n6 : randomPassword()
      }

      await supabase
      .from("users")
      .insert([{userName:userName!,passkeys:passKeys}])

      alert("Account Made!")    
    }  
      catch(e){
        console.error(e);
      }
    }

    const[userName,setUserName] = useState<string>();
    const [pass,setPass] = useState<string>()
    const [passRepeat,setPassRepeat] = useState<string>()

    return (
        <div className="signUpPane relative bg-slate-300 dark:bg-slate-700 w-2/3 min-[720px]:w-[480px] h-[614px] mt-20 rounded-2xl">
          <div>
          <span className="my-14 flex justify-center text-4xl font-bold">Sign Up</span>
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
