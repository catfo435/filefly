"use client"
import SendFilePane from '@/app/components/SendFilePane'
import SentFilesPane from '@/app/components/SentFilesPane'
import React, { useEffect, useState } from 'react'


export default function Page() {

  const [paneState, setPaneState] = useState(false)

  window.addEventListener("resize",() => {
    if(window.outerWidth > 768){
      document.getElementsByClassName("viewSentFiles")[0].classList.remove("responsive");
      document.getElementsByClassName("sendFiles")[0].classList.remove("responsive");
    }
    
  })

  return (
    <div className='flex-auto flex flex-col items-center md:flex-row'>
        <div className='md:hidden flex flex-initial items-center justify-center bg-slate-350 dark:bg-slate-500 mt-5 h-14 px-2 py-2 w-fit rounded-lg text-lg hover:cursor-pointer'
        onClick={() => {
          if (paneState){
            document.getElementsByClassName("viewSentFiles")[0].classList.remove("responsive");
            document.getElementsByClassName("sendFiles")[0].classList.remove("responsive");
            setPaneState(false)
            return;
          }
          document.getElementsByClassName("viewSentFiles")[0].classList.add("responsive");
          document.getElementsByClassName("sendFiles")[0].classList.add("responsive");
          setPaneState(true);
        }}>
          {paneState?"Send Files":"Show Files Sent"}</div>
        <SendFilePane />
        <SentFilesPane />
    </div>
  )
}
