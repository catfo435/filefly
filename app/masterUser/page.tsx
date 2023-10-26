"use client"
import React, { useEffect, useState } from 'react'

export default function Page() {

  useEffect(() => {
    setUserName(sessionStorage.getItem("user")!)
  })

  const [userName,setUserName] = useState<string>()

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <div className="flex-initial text-4xl md:text-5xl my-4 w-full h-fit flex justify-center">
        <span>Welcome, {userName}!</span>
      </div>
        <div className='flex justify-center items-center bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl'>
            <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2 px-5 py-5 text-3xl md:text-4xl'>
                <div className='bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700 hover:cursor-pointer rounded-3xl flex justify-center items-center' onClick={
                  () => {window.location.href = "/masterUser/loginHistory"}
                }>Login History</div>
                <div className='bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700 hover:cursor-pointer rounded-3xl flex justify-center items-center'onClick={
                  () => {window.location.href = "/masterUser/blockedUsers"}
                }>Block Users</div>
                <div className='bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700 hover:cursor-pointer rounded-3xl flex justify-center items-center'>Change Passkeys</div>
                <div className='bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700 hover:cursor-pointer rounded-3xl flex justify-center items-center'>Check File History</div>
            </div>
        </div>
    </div>
  )
}
