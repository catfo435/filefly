"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import FileDetailsPane from '../components/FileDetailsPane';

import { ref, updateMetadata, uploadBytes } from "firebase/storage";
import { fileStorage } from '@/app/backend/fireBase';


export default function SendFilePage() {

  const [toUser,setToUser] = useState<string>()

  function handleFileSend(){

    const fileUploadRef = ref(fileStorage,`${sessionStorage.getItem("set_user")}/${fileDetails!.name}`)

    const newMetadata = {
      customMetadata : {
        sentBy : sessionStorage.getItem("user")!
      }
    }

    uploadBytes(fileUploadRef, fileDetails!, newMetadata).then((snapshot) => {
    alert("File sent!")
    });
  }


  async function handleFileUpload(e:ChangeEvent<HTMLInputElement>){
    
    if (!e.target.files) setUploadState(false);
    else {
      if (e.target.files[0].size/1000000 > 2) {
        alert("Files cannot exceed 2MB")
        return;
      }
      setUploadState(true)
      setFileDetails(e.target.files[0])

    }    
  }

  const [uploadState,setUploadState] = useState(false)
  const [fileDetails, setFileDetails] = useState<File | null>()

  
  useEffect(() => {
    setToUser(sessionStorage.getItem("set_user")!)
  },[])

  return (
    <div className='sendFiles w-full flex flex-auto md:flex-none justify-center items-center'>
        <div className="bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-4xl">
          <div className='content py-4 px-4 w-full h-full flex flex-col items-center shrink-0'>
            <span className='text-6xl'>Send File</span>
            <span className='text-4xl mt-5'>To</span>
            <div className='w-2/3 h-fit rounded-xl my-8 px-3 py-3 dark:bg-slate-700 outline-none text-center'>{toUser}</div>
            <div className='flex w-[90%] h-full bg-slate-300 dark:bg-slate-800 mt-5 mb-5 rounded-3xl'>
             {!uploadState?<div className='w-1/2 flex flex-col items-center my-5 ml-6 text-5xl'>
                <span className='my-10'>Select</span>
                <span className='my-5'>the</span>
                <span className='my-10'>Files</span>
              </div>:<div className='w-1/2 flex flex-col items-center my-5 ml-6 text-5xl'><FileDetailsPane fileDetails={fileDetails!} /></div>}
              <div className='flex w-1/2 bg-slate-350 dark:bg-slate-700 hover:opacity-90 hover:dark:bg-slate-650 my-5 mr-6 rounded-lg justify-center items-center'>
                <label className='w-full h-full flex flex-col justify-center items-center hover:cursor-pointer'>
                  Browse files
                <input className='hidden' type='file' onChange={handleFileUpload}></input>
                </label>
              </div>
            </div>
            {!uploadState?"":<div className='grid grid-cols-2 gap-4'>
            <div className='bg-slate-350 dark:bg-slate-700 hover:opacity-90 hover:dark:bg-slate-650 px-3 py-3 hover:cursor-pointer rounded-3xl' onClick={
              () => {
                handleFileSend()
              }
            }>Send</div>
            <div className='bg-slate-350 dark:bg-slate-700 hover:opacity-90 hover:dark:bg-slate-650 px-3 py-3 hover:cursor-pointer rounded-3xl' onClick={
              () => {
                setUploadState(false)
                setFileDetails(null)
              }
            }>Clear</div>
            </div> }           
          </div>
        </div>
    </div>
  )
}
