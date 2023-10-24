"use client"
import React from 'react'

export default function UserMenu() {
  return (
    <div className='userMenu flex absolute h-screen top-0 w-0 bg-slate-350 dark:bg-slate-600 transition-[width] duration-1000'>
        <div className='clickDisableOverlay invisible md:bg-black opacity-50 md:absolute md:w-screen md:h-screen'></div>
        <div className='w-fit text-white absolute right-2 top-1 text-4xl hover:cursor-pointer z-10' onClick={() => {
            const userMenu = (document.getElementsByClassName("userMenu")[0] as HTMLElement);
            const overlay = (document.getElementsByClassName("clickDisableOverlay")[0] as HTMLElement);
            const content = (document.getElementsByClassName("dashboardContent")[0] as HTMLElement);
            content.classList.remove("pointer-events-none");
            userMenu.classList.remove("active");
            overlay.classList.remove("active");
        }}>
            X
        </div>
        <div className='absolute top-0 right-0'>
        <div className='flex flex-col h-full w-screen md:w-[300px] items-center divide-y-2'>
          <div className='flex flex-initial text-6xl my-5'>
            Menu
          </div>
          <div className='flex-auto w-[90%] flex flex-col items-center text-3xl text-center'>
            <span className='mt-4 w-full hover:cursor-pointer hover:opacity-80'>About</span>
            <span className='mt-4 w-full hover:cursor-pointer hover:opacity-80'>Passwords and Security</span>
          </div>
        </div>
        </div>
    </div>
  )
}
