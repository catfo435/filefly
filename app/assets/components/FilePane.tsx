"use client"
import { fileStorage } from '@/app/backend/fireBase'
import { saveAs } from 'file-saver'
import { getBlob, getDownloadURL, ref } from 'firebase/storage'
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
        saveAs(await getBlob(ref(fileStorage, props.downloadFilePath)),props.fileName)
    }
    else return;
  }

  return (
        <div title={props.time} className='w-[80%] h-[150px] my-5 flex justify-center items-center bg-slate-350 dark:bg-slate-700 hover:opacity-90 hover:dark:bg-slate-650 hover:cursor-pointer rounded-lg'
        onClick={handleClick}>
        <div className='content flex w-[90%] h-[90%] items-center text-2xl md:text-3xl divide-x-4 divide-slate-400 dark:divide-slate-600'>
            <div className='w-1/2 h-full flex items-center justify-center'>
                <div className='w-20 h-20 md:w-28 md:h-28 bg-slate-400 dark:bg-slate-500 rounded-full flex justify-center items-center'>{props.fileName.match("[^.]+$")![0].toUpperCase()}</div>
            </div>
            <div className='w-1/2 h-full flex overflow-x-scroll items-center justify-center'>
                {props.fileName}
            </div>
        </div>
    </div>
  )
}
