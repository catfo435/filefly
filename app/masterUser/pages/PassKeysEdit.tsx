"use client"
import { supabase } from '@/app/backend/supabase'
import { passKeyJson } from '@/app/backend/supabase/database.types'
import React, { useEffect, useState } from 'react'


export default function PassKeysEdit() {


    async function fetchPassKeys(){
        const passKeysRef = await supabase
        .from("users")
        .select()
        .eq("userName",sessionStorage.getItem("user")!)
        
        setPassKeys(passKeysRef.data![0].passkeys)
        
    }

  useEffect(() => {
    fetchPassKeys()

    setUsername(sessionStorage.getItem("user")!)

  },[])

  const [passKeys,setPassKeys] = useState<passKeyJson>()
  const [userName, setUsername] = useState<string>()

  return (
    <div className='flex flex-col bg-slate-300 px-5 py-5 dark:bg-slate-700 w-2/3 h-[720px] mt-20 rounded-2xl items-center'>
        <span className='text-3xl my-4'>Your PassKeys, {userName}!</span>
        <div className='passGrid grid grid-cols-3 w-full h-[600px] text-2xl gap-2'>
            <div className='bg-slate-350 dark:bg-slate-650 col-span-3 px-5 py-5 flex justify-center items-center text-center'>Master: {passKeys?.master}</div>
            <div className='bg-slate-350 dark:bg-slate-600 rounded-2xl px-5 py-5 flex flex-col justify-center items-center text-center'>
                <span className='my-2'>PassKey: {passKeys?.normalPasskeys[0].passkey}</span>
                <span className='my-2'>Caption: {passKeys?.normalPasskeys[0].caption}</span>
            </div>
            <div className='bg-slate-350 dark:bg-slate-600 rounded-2xl px-5 py-5 flex flex-col justify-center items-center text-center'>
                <span className='my-2'>PassKey: {passKeys?.normalPasskeys[1].passkey}</span>
                <span className='my-2'>Caption: {passKeys?.normalPasskeys[1].caption}</span>
            </div>
            <div className='bg-slate-350 dark:bg-slate-600 rounded-2xl px-5 py-5 flex flex-col justify-center items-center text-center'>
                <span className='my-2'>PassKey: {passKeys?.normalPasskeys[2].passkey}</span>
                <span className='my-2'>Caption: {passKeys?.normalPasskeys[2].caption}</span>
            </div>
            <div className='bg-slate-350 dark:bg-slate-600 rounded-2xl px-5 py-5 flex flex-col justify-center items-center text-center'>
                <span className='my-2'>PassKey: {passKeys?.normalPasskeys[3].passkey}</span>
                <span className='my-2'>Caption: {passKeys?.normalPasskeys[3].caption}</span>
            </div>
            <div className='bg-slate-350 dark:bg-slate-600 rounded-2xl px-5 py-5 flex flex-col justify-center items-center text-center'>
                <span className='my-2'>PassKey: {passKeys?.normalPasskeys[4].passkey}</span>
                <span className='my-2'>Caption: {passKeys?.normalPasskeys[4].caption}</span>
            </div>
            <div className='bg-slate-350 dark:bg-slate-600 rounded-2xl px-5 py-5 flex flex-col justify-center items-center text-center'>
                <span className='my-2'>PassKey: {passKeys?.normalPasskeys[5].passkey}</span>
                <span className='my-2'>Caption: {passKeys?.normalPasskeys[5].caption}</span>
            </div>
            
        </div>
    </div>
  )
}
