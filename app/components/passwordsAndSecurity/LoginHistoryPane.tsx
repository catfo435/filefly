import React from 'react'
import LoginEntryPane from './LoginEntryPane'

const dummyLoginEntries = [
    {
        id:1,
        user:"normal-1",
        time:"timestamp",
        ipAddress:"0.0.0.0"
    },
    {
        id:2,
        user:"normal-2",
        time:"timestamp",
        ipAddress:"0.0.0.0"
    },
    {
        id:3,
        user:"normal-4",
        time:"timestamp",
        ipAddress:"0.0.0.0"
    },
    {
        id:4,
        user:"normal-3",
        time:"timestamp",
        ipAddress:"0.0.0.0"
    },
    {
        id:5,
        user:"MASTER USER",
        time:"timestamp",
        ipAddress:"0.0.0.0"
    },
]

export default function LoginHistoryPane() {


  return (
    <div className='my-5 mx-5 w-full flex flex-col items-center'>
        <span className='flex-initial w-fit h-fit'>Login History</span>
        <div className='flex-auto flex flex-col w-full shrink-0 items-center overflow-scroll bg-slate-300 dark:bg-slate-700 mt-5 mb-10 rounded-3xl'>
        {dummyLoginEntries.map((loginEntryProps) => {return <LoginEntryPane key={loginEntryProps.id} {...loginEntryProps} /> })}
        </div>
    </div>
  )
}
