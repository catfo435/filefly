"use client"
import { supabase } from '@/app/backend/supabase'
import { passKey, passKeyJson } from '@/app/backend/supabase/database.types'
import React, { useEffect, useState } from 'react'
import PassKeyPane from '../masterComponents/PassKeyPane'
import { sha256 } from 'js-sha256'


export default function PassKeysEdit() {


    async function handlePassKeyEdit(passkey:string,caption:string,id:number){

        const temp = passKeys!
        temp.normalPasskeys[id-1] = {id:id,passkey:sha256(passkey),caption:caption}

        try {
        await supabase
        .from("users")
        .update({passkeys:{master:temp.master,normalPasskeys:temp.normalPasskeys}})
        .eq("user_name",sessionStorage.getItem("user")!)
        .then(() => {
            alert("Passkey updated")
            fetchPassKeys()
        })
        }
        catch(e){
            alert("Error!")
            console.error(e);
            fetchPassKeys()
        }
    }


    async function fetchPassKeys(){
        const passKeysRef = await supabase
        .from("users")
        .select()
        .eq("user_name",sessionStorage.getItem("user")!)
        
        setLoading(false)
        setPassKeys(passKeysRef.data![0].passkeys)
        
    }

  useEffect(() => {
    fetchPassKeys()

    setUserName(sessionStorage.getItem("user")!)

  },[])

  const [passKeys,setPassKeys] = useState<passKeyJson>()
  const [user_name, setUserName] = useState<string>()

  const [loading, setLoading] = useState(true)

  return (
    <div className='flex flex-col bg-slate-300 px-5 py-5 dark:bg-slate-700 w-2/3 h-[720px] mt-20 rounded-2xl items-center'>
        <span className='text-3xl my-4'>Your PassKeys, {user_name}!</span>
        <div className='passGrid grid grid-cols-3 w-full h-[600px] text-2xl gap-2'>
            {loading?<div className='bg-slate-350 dark:bg-slate-650 col-span-3 row-span-2 px-5 py-5 flex justify-center items-center text-center'>Loading...</div>:
            passKeys!.normalPasskeys.map((passkey, key) => {return <PassKeyPane passkey={passkey} key={key} handlePassKeyEdit={handlePassKeyEdit} />})
            }
        </div>
    </div>
  )
}
