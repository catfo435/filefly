"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import FileDetailsPane from '../components/FileDetailsPane';

import { ref, uploadBytes } from "firebase/storage";
import { fileStorage } from '@/app/backend/fireBase';
import { supabase } from '@/app/backend/supabase';
import { checkUser } from '@/app/backend/jwt';


export default function SendFilePage() {



  async function handleFileSend(){

    checkUser()

    const now = new Date()
    const beforeOneHour = new Date(now.valueOf() - (1000*60*60))

    try{
      const checkCooldown = await supabase
    .from("fileHistory")
    .select()
    .eq("master",sessionStorage.getItem("user")!)
    .gt("transactionTime",beforeOneHour.toISOString())
    

    if (checkCooldown.data!.length >= 5){

      const minDate = new Date(
        Math.min(
          ...checkCooldown.data!.map(element => {
            return new Date(element.transactionTime!).getTime();
          }),
        )
      );      

      alert(`File Cooldown, Try after ${Math.ceil((minDate.valueOf() - beforeOneHour.valueOf())/(1000*60))} minutes`)
      return;
    }
    
  }
  catch(e){
    console.error(e);
    
  }


    const fileUploadRef = ref(fileStorage,`${sessionStorage.getItem("set_user")}/${fileDetails!.name}`)

    const newMetadata = {
      customMetadata : {
        sentBy : sessionStorage.getItem("user")!,
        caption : fileCaption
      }
    }

    uploadBytes(fileUploadRef, fileDetails!, newMetadata).then(async (snapshot) => {

      await supabase
      .from("fileHistory")
      .insert([{sentBy:sessionStorage.getItem("normal-user-name")!,sentTo:sessionStorage.getItem("set_user")!,master:sessionStorage.getItem("user")!,fileName:fileDetails!.name}])
      

    alert("File sent!")
    });
  }


  async function handleFileUpload(e:ChangeEvent<HTMLInputElement>){

    checkUser()

    
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
  const [fileCaption, setFileCaption] = useState<string>("")
  const [toUser, setToUser] = useState<string>()

  
  useEffect(() => {
    setToUser(sessionStorage.getItem("set_user")!)
  },[])

  return (
    <div className='sendFiles w-full flex flex-auto md:flex-none justify-center items-center'>
        <div className="bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-4xl">
          <div className='content py-4 px-4 w-full h-full flex flex-col items-center shrink-0'>
            <span className='text-6xl'>Send File To {toUser}</span>
            <div className='flex my-10'>
              <div className='flex justify-center items-center'>
              <label htmlFor='caption'>Caption for file:</label>
              </div>
              <div className='flex justify-center items-center mx-5'>
              <input id='caption' className='input col-span-3 w-full rounded-xl px-3' value={fileCaption} onChange={(e) => {setFileCaption(e.target.value)}}></input>
              </div>
            </div>
            <div className='flex w-[90%] h-[400px] bg-slate-300 dark:bg-slate-800 mb-5 rounded-3xl'>
             {!uploadState?<div className='w-1/2 h-full flex flex-col items-center my-5 ml-6 text-5xl'>
                <span className='my-10'>Select</span>
                <span className='my-5'>the</span>
                <span className='my-10'>Files</span>
              </div>:<div className='w-1/2 h-full flex flex-col items-center my-5 ml-6 text-5xl'><FileDetailsPane fileDetails={fileDetails!} /></div>}
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
