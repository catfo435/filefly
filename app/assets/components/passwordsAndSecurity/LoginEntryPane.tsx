import React from 'react'

type LoginEntryPaneProps = {
  id: number
  loginTime: string | null
  master_user: string | null
  user: string
}

export default function LoginEntryPane(props: LoginEntryPaneProps) {
  return (
    <div className='flex mt-5 text-lg md:text-2xl h-5 my-3'>
        {props.user} @ {props.loginTime}
    </div>
  )
}
