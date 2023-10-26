import React from 'react'

export default function BlockedUsersPage() {
  return (
    <div className='flex w-full h-full justify-center items-center'>
        <div className='w-[500px] h-[500px] px-5 py-5 bg-slate-300 dark:bg-slate-700'>
            <div className='text-3xl flex justify-center'>Blocked Users</div>
            <div className='overflow-scroll'>
                <div className='w-[90%] h-20 my-5 px-5 py-5'>UserName</div>
                <div className='w-[90%] h-20 my-5 px-5 py-5'>UserName</div>
                <div className='w-[90%] h-20 my-5 px-5 py-5'>UserName</div>
                <div className='w-[90%] h-20 my-5 px-5 py-5'>UserName</div>
            </div>
        </div>
    </div>
  )
}
