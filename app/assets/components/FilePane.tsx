"use client"
import { fileStorage } from '@/app/backend/fireBase'
import { getDownloadURL, ref } from 'firebase/storage'
import React from 'react'

// Will be changed when backend is implemented
export type FilePaneProps = {
    user? : string,
    fileName: string,
    time?: string,
    downloadFilePath?: string
}


export default function FilePane(props: FilePaneProps) {

  async function handleClick(){
    if (props.downloadFilePath){
        (document.getElementById(`download-${props.fileName}-${props.user}`)! as HTMLAnchorElement).href = await getDownloadURL(ref(fileStorage, props.downloadFilePath))
    }
    else return;
  }

  return (
    <a id={`download-${props.fileName}-${props.user}`} href="" download={props.fileName}>
        <div title={props.time} className='w-[80%] h-[150px] my-5 flex justify-center items-center bg-slate-350 dark:bg-slate-700 hover:opacity-90 hover:dark:bg-slate-650 rounded-lg'
        onClick={handleClick}>
        <div className='content flex w-[90%] h-[90%] items-center text-3xl divide-x-4 divide-slate-400 dark:divide-slate-600'>
            <div className='w-1/3 h-full flex items-center justify-center'>
                <div className='w-28 h-28 bg-slate-400 dark:bg-slate-500 rounded-full flex justify-center items-center'>TXT</div>
            </div>
            <div className='w-1/3 h-full flex items-center justify-center'>
                {props.fileName}
            </div>
            <div className='w-1/3 h-full flex items-center justify-center'>
                {props.user}
            </div>
        </div>
    </div>
    </a>
  )
}
