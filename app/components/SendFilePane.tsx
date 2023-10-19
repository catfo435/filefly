import React from 'react'

export default function SendFilePane() {
  return (
    <div className='sendFiles w-1/2 flex justify-center items-center'>
        <div className="bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-4xl md:text-4xl">
          <div className='content py-4 px-4 w-full h-full flex flex-col items-center'>
            <span className='text-6xl'>Send File</span>
            <span className='text-4xl mt-5'>To</span>
            <input placeholder='Username' className='w-2/3 h-fit rounded-xl my-8 px-3 py-3 dark:bg-slate-700 outline-none' type='text'></input>
            <div className='flex w-[90%] h-full bg-slate-300 dark:bg-slate-800 mt-5 mb-10 rounded-3xl'>
              <div className='w-1/2 flex flex-col items-center my-5 ml-6 text-5xl'>
                <span className='my-10'>Select</span>
                <span className='my-5'>the</span>
                <span className='my-10'>Files</span>
              </div>
              <div className='flex w-1/2 bg-slate-350 dark:bg-slate-700 my-5 mr-6 rounded-lg justify-center items-center'>
                <label className='w-full h-full flex flex-col justify-center items-center hover:cursor-pointer'>
                  Browse files
                <input className='hidden' type='file'></input>
                </label>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
