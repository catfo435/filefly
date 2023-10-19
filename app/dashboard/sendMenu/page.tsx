import SendFilePane from '@/app/components/SendFilePane'
import SentFilesPane from '@/app/components/SentFilesPane'
import React from 'react'

export default function Page() {
  return (
    <div className='flex-auto flex'>
        <SendFilePane />
        <SentFilesPane />
    </div>
  )
}
