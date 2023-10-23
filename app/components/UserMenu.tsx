"use client"
import React from 'react'

export default function UserMenu() {
  return (
    <div className='userMenu flex absolute h-screen top-0 w-0 bg-slate-350 dark:bg-slate-600 transition-[width] duration-1000'>
        <div className='w-fit text-white absolute right-2 top-1 text-4xl hover:cursor-pointer z-10' onClick={() => {
            const userMenu = (document.getElementsByClassName("userMenu")[0] as HTMLElement);
            userMenu.classList.remove("active");
        }}>
            X
        </div>
        <div className='absolute top-0 right-0'>
        <div className='flex flex-col h-full w-screen md:w-[300px] items-center divide-y-2'>
          <div className='flex flex-initial text-6xl my-5'>
            Menu
          </div>
          <div className='flex-auto w-[90%] flex flex-col items-center text-3xl text-center'>
            <span className='mt-4 w-full hover:cursor-pointer'>About</span>
            <span className='mt-4 w-full hover:cursor-pointer'>Change Password</span>
            <span className='mt-4 w-full hover:cursor-pointer'>Passwords and Security</span>
          </div>
        </div>
        </div>
    </div>
  )
}
