import React from 'react'

// Will be changed when backend is implemented
type FilePaneProps = {
    user : string,
    fileName: string,
    time: string,
}


export default function FilePane(props: FilePaneProps) {
  return (
    <div title={props.time} className='w-[80%] h-[150px] my-5 flex justify-center items-center bg-slate-350 dark:bg-slate-700 hover:opacity-90 hover:dark:bg-slate-650 rounded-lg'>
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
  )
}
