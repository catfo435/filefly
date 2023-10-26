"use client"
import { passKey } from '@/app/backend/supabase/database.types'
import React, { useState } from 'react'

type PassKeyPaneProps = {
  passkey : passKey,
  handlePassKeyEdit : Function
}

export default function PassKeyPane(props: PassKeyPaneProps) {
  const [passKeyVal, setpassKeyVal] = useState<string>(props.passkey.passkey)
  const [captionVal, setCaptionVal] = useState<string>(props.passkey.caption)

  const [editState, setEditState] = useState(false)

  return (<div className='bg-slate-350 dark:bg-slate-650 rounded-2xl px-5 py-5 flex flex-col justify-center items-center text-center'>
            <input className={editState?'my-2 px-2 py-2 rounded-3xl text-center':'my-2 px-2 py-2 rounded-3xl bg-slate-350 dark:bg-slate-650 text-center'} value={passKeyVal} onChange={(e) => {setpassKeyVal(e.target.value)}}></input>
            <input className={editState?'my-2 px-2 py-2 rounded-3xl text-center':'my-2 px-2 py-2 rounded-3xl bg-slate-350 dark:bg-slate-650 text-center'} value={captionVal} onChange={(e) => {setCaptionVal(e.target.value)}}></input>
          <div className='grid grid-cols-2 gap-4'>
            <div className='bg-slate-350 dark:bg-slate-700 hover:opacity-90 hover:dark:bg-slate-650 px-3 py-3 hover:cursor-pointer rounded-3xl flex justify-center items-center' onClick={() => {
              if (editState){
                props.handlePassKeyEdit(passKeyVal,captionVal,props.passkey.id)
                setEditState(false)
              }
              else{
                setEditState(true)
              }
            }}>{editState?"Save":"Edit"}</div>
            <div className='bg-slate-350 dark:bg-slate-700 hover:opacity-90 hover:dark:bg-slate-650 px-3 py-3 hover:cursor-pointer rounded-3xl flex justify-center items-center' onClick={
              () =>{
                setpassKeyVal(props.passkey.passkey)
                setCaptionVal(props.passkey.caption)
                setEditState(false)
              }
            }>Discard Changes</div>
          </div>
</div>
  )
}
