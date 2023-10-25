import React from 'react'
import LoginHistoryPane from './passwordsAndSecurity/LoginHistoryPane'

export default function SecurityPane() {
  return (
    <div className='flex justify-center items-center w-full h-full'>
        <div className='flex justify-center items-center bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl'>
            <div className='w-full h-full grid grid-cols-1 md:grid-cols-2 gap-2 px-5 py-5 text-3xl md:text-4xl'>
                <div className='bg-slate-300 dark:bg-slate-800 rounded-3xl flex justify-center items-center md:row-span-2'><LoginHistoryPane /></div>
                <div className='bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700 hover:cursor-pointer rounded-3xl flex justify-center items-center'>Change Passwords</div>
                <div className='bg-slate-300 dark:bg-slate-800 hover:dark:bg-slate-700 hover:cursor-pointer rounded-3xl flex justify-center items-center'>Block Users</div>
            </div>
        </div>
    </div>
  )
}
