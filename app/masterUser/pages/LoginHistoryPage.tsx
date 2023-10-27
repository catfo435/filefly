"use client"
import React, { useEffect, useState } from 'react'
import LoginEntryPane from '../masterComponents/LoginEntryPane'
import { LoginEntry } from '@/app/backend/supabase/database.types'
import { supabase } from '@/app/backend/supabase'

export default function LoginHistoryPage() {

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
    <div className='flex flex-col w-full h-full items-center'>
        <span className='flex-initial w-fit h-fit text-3xl my-3'>Login History</span>
          <div className={`flex flex-col w-[900px] items-center overflow-scroll bg-slate-300 dark:bg-slate-700 ${loading?"animate-pulse h-[700px]":""} my-5 mx-auto rounded-3xl px-5 py-5`}>
            {loading?"Loading...":""}
        {loginHistory!.map((loginEntryProps,id) => {return <LoginEntryPane key={id} {...loginEntryProps} /> })}
        </div>
    </div>
  )
}
