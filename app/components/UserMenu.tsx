"use client"
import React from 'react'

export default function UserMenu() {
  return (
    <div className='userMenu absolute h-screen top-0 w-0 bg-slate-500 transition-[width] duration-1000'>
        <div className='w-fit text-white absolute right-2 top-1 text-6xl hover:cursor-pointer' onClick={() => {
            const userMenu = (document.getElementsByClassName("userMenu")[0] as HTMLElement);
            userMenu.style.width = "0px";
        }}>
            X
        </div>
    </div>
  )
}
