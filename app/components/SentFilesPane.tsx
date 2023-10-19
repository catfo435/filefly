import React from 'react'
import SentFilePane from './SentFilePane'

// Will be removed when backend is implemented
const dummyFileArray = [
  {
    sentTo:"catfo",
    fileName:"dummy.txt",
    time:"dummytime",
  },
  {
    sentTo:"catfo",
    fileName:"dummy.txt",
    time:"dummytime",
  },
  {
    sentTo:"catfo",
    fileName:"dummy.txt",
    time:"dummytime",
  },
  {
    sentTo:"catfo",
    fileName:"dummy.txt",
    time:"dummytime",
  },
  {
    sentTo:"catfo",
    fileName:"dummy.txt",
    time:"dummytime",
  },
  
]


export default function SentFilesPane() {
  return (
    <div className='viewSentFiles w-1/2 flex justify-center items-center'>
        <div className="bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl flex justify-center text-5xl md:text-7xl">
        <div className='flex flex-col content py-4 px-4 w-full h-full items-center'>
          <div className='w-fit h-fit'>Files Sent</div>
          <div className='flex flex-col w-full h-[580px] items-center overflow-scroll bg-slate-300 dark:bg-slate-800 mt-5 mb-10 rounded-3xl'>
            {dummyFileArray.map((fileProps) => {return <SentFilePane {...fileProps} /> })}
          </div>
        </div>
        </div>
    </div>
  )
}
