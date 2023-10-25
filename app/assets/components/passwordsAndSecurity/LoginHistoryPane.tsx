"use client"
import React, { useEffect, useState } from 'react'
import LoginEntryPane from './LoginEntryPane'
import { Database, LoginEntry } from '@/app/backend/supabase/database.types'
import { supabase } from '@/app/backend/supabase'

export default function LoginHistoryPane() {

    async function fetchLoginHistory(){

        const loginHistoryReq = await supabase
        .from("loginHistory")
        .select()
        .eq("master_user",sessionStorage.getItem("user")!)

        setLoginHistory(loginHistoryReq!.data!)
        setLoading(false)
    }


    useEffect(() => {
        fetchLoginHistory()
    })

    const [loginHistory,setLoginHistory] = useState<Array<LoginEntry>>([])
    const [loading, setLoading] = useState(true)

  return (
    <div className='md:my-5 md:mx-5 w-full h-full flex flex-col justify-center items-center'>
        <span className='md:flex-initial w-fit h-fit'>Login History</span>
        <div className={loading?'loadingAnimation md:h-[500px] animate-pulse':'loadingAnimation md:h-[600px]'}>
          <div className='hidden md:flex md:justify-center'>
          <div className='flex-auto h-full flex flex-col w-full items-center overflow-scroll bg-slate-300 dark:bg-slate-700 mt-5 mb-10 rounded-3xl px-5 py-5'>
        {loginHistory!.map((loginEntryProps,id) => {return <LoginEntryPane key={id} {...loginEntryProps} /> })}
        </div>
          </div>
        </div>
    </div>
  )
}
