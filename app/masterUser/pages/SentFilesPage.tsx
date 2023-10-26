"use client"
import React, { useEffect, useState } from 'react'

import { supabase } from '@/app/backend/supabase';
import SentFilePane, { SentFilePaneProps } from '../masterComponents/sentFilePane';


export default function SentFilesPage() {

  async function fetchSentFileHistory(){
    const sentFilesRef = await supabase
    .from("fileHistory")
    .select()
    .eq("master",sessionStorage.getItem("user")!)

    if (!sentFilesRef.data![0] || !sentFilesRef.data){
        setFileArray([])
        setLoading(false)
        return;
    }

    let fileArray = new Array<SentFilePaneProps>;
    for (var i=0;i<sentFilesRef.data.length;i++){
        let tmp = {
            sentBy : sentFilesRef.data[i].sentBy,
            sentTo : sentFilesRef.data[i].sentTo,
            fileName : sentFilesRef.data[i].fileName
        }
        fileArray.push(tmp)
    }
    setFileArray(fileArray)
    setLoading(false)

  }

  useEffect(() => {

    fetchSentFileHistory()
    
  },[])

  const [FileArray,setFileArray] = useState<Array<any>>()
  const [loading,setLoading] = useState(true)


  return (
    <div className='receivedFiles w-full flex justify-center items-center'>
        <div className="bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl flex justify-center text-5xl md:text-7xl">
        <div className='flex flex-col content py-4 px-4 w-full h-full items-center'>
          <div className='w-fit h-fit'>Files Sent</div>
          <div className='flex flex-col w-full h-[580px] items-center overflow-scroll bg-slate-300 dark:bg-slate-800 mt-5 mb-10 rounded-3xl'>
            {loading?<div className='flex w-full h-full justify-center items-center'>Loading...</div>:
            FileArray?.map((fileProps,id) => {return <SentFilePane key={id} {...fileProps} /> })
            }
          </div>
        </div>
        </div>
    </div>
  )
}
