import React from 'react'

type LoginEntryPaneProps = {
    user:string,
    time:string,
    ipAddress:string
}

export default function LoginEntryPane(props: LoginEntryPaneProps) {
  return (
    <div className='flex mt-5 text-lg md:text-2xl'>
        {props.user} @ {props.time} from {props.ipAddress}
    </div>
  )
}
