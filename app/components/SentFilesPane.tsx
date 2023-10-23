import React from 'react'
import FilePane from './FilePane'

// Will be removed when backend is implemented
const dummyFileArray = [
  {
    id:1,
    user:"catfo",
    fileName:"dummy.txt",
    time:"dummytime",
  },
  {
    id:2,
    user:"catfo",
    fileName:"dummy.txt",
    time:"dummytime",
  },
  {
    id:3,
    user:"catfo",
    fileName:"dummy.txt",
    time:"dummytime",
  },
  {
    id:4,
    user:"catfo",
    fileName:"dummy.txt",
    time:"dummytime",
  },
  {
    id:5,
    user:"catfo",
    fileName:"dummy.txt",
    time:"dummytime",
  },
  
]


export default function SentFilesPane() {
  return (
    <div className='viewSentFiles w-1/2 hidden md:flex justify-center items-center'>
        <div className="bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl flex justify-center text-5xl md:text-7xl">
        <div className='flex flex-col content py-4 px-4 w-full h-full items-center'>
          <div className='w-fit h-fit'>Files Sent</div>
          <div className='flex flex-col w-full h-[580px] items-center overflow-scroll bg-slate-300 dark:bg-slate-800 mt-5 mb-10 rounded-3xl'>
            {dummyFileArray.map((fileProps) => {return <FilePane key={fileProps.id} {...fileProps} /> })}
          </div>
        </div>
        </div>
    </div>
  )
}
