import React from 'react'
import ReceivedFilesPage from '../../pages/ReceivedFilesPage'
import SentFilesPage from '../../pages/SentFilesPage'

export default function Page() {
  return (
    <div className='flex-auto flex'>
        <SentFilesPage />
    </div>
  )
}
