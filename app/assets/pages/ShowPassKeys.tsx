import { passKey } from '@/app/backend/supabase/database.types'
import React from 'react'

export type PassKeysProps = {
    master:string,
    normalPasskeys : Array<passKey>
}

export default function ShowPassKeys(props: PassKeysProps) {
  return (
    <div className='flex flex-col bg-slate-300 px-5 py-5 dark:bg-slate-700 w-2/3 h-[720px] mt-20 rounded-2xl items-center'>
        <span className='text-3xl my-4'>Account Created! Here are your PassKeys:</span>
        <div className='passGrid grid grid-cols-3 w-full h-[600px] text-2xl gap-2'>
            <div className='bg-slate-350 dark:bg-slate-650 col-span-3 px-5 py-5 flex justify-center items-center text-center'>Master: {props.master}</div>
            {props.normalPasskeys.map((passkey,id) => {return <div key={id} className='bg-slate-350 dark:bg-slate-600 rounded-2xl px-5 py-5 flex justify-center items-center text-center'>PassKey: {passkey.passkey}</div>})}
        </div>
        <div className='text-center text-2xl'>Note down the passKeys(Can be changed later using Master Key)</div>
        <div className='bg-slate-400 dark:bg-slate-500 w-40 h-20 mt-5 hover:cursor-pointer hover:opacity-90 flex justify-center items-center rounded-2xl' onClick={() => {window.location.href = "/"}}>OK</div>
    </div>
  )
}
