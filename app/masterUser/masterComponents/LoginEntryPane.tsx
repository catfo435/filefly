import React from 'react'

type LoginEntryPaneProps = {
  id: number
  loginTime: string | null
  master_user: string | null
  user: string
  loginDeviceDetails : string
}

export default function LoginEntryPane(props: LoginEntryPaneProps) {

  const parseLoginTime = new Date(props.loginTime!)

  return (
    <div title={props.loginDeviceDetails} className='flex mt-5 text-lg md:text-2xl my-3 px-5 py-5 bg-slate-400 dark:bg-slate-500 rounded-lg'>
        {props.user} @ {parseLoginTime.toLocaleString()}
    </div>
  )
}
