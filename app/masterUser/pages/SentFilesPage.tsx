"use client"
import React, { useEffect, useState } from 'react'

import { supabase } from '@/app/backend/supabase';
import SentFilePane, { SentFilePaneProps } from '../masterComponents/sentFilePane';
import FuzzySearch from 'fuzzy-search';


export default function SentFilesPage() {

  async function fetchSentFileHistory(){
    const sentFilesRef = await supabase
    .from("fileHistory")
    .select()
    .eq("master",sessionStorage.getItem("user")!)

    if (!sentFilesRef.data![0] || !sentFilesRef.data){
        setFileArray([])
        setFileArrayAll([])
        setLoading(false)
        return;
    }


    let fileArray = new Array<SentFilePaneProps>;
    for (var i=0;i<sentFilesRef.data.length;i++){
        const fileData = sentFilesRef.data[i]


        let blocked = false;

        const blockedUsersRef = await supabase
        .from("users")
        .select()
        .eq("user_name",sessionStorage.getItem("user")!)

        if (blockedUsersRef.data![0].blockedUsers.users.includes(fileData.sentTo!)){
          blocked = true
        }


        let tmp = {
            sentBy : fileData.sentBy,
            sentTo : fileData.sentTo,
            fileName : fileData.fileName,
            caption : fileData.caption,
            time: fileData.transactionTime!,
            blocked: blocked,
            version: fileData.version!
        }
        fileArray.push(tmp)
    }
    setFileArray(fileArray)
    setFileArrayAll(fileArray)
    setLoading(false)

  }

  useEffect(() => {

    fetchSentFileHistory()
    
  },[])

  const [FileArray,setFileArray] = useState<Array<SentFilePaneProps>>()
  const [FileArrayAll,setFileArrayAll] = useState<Array<SentFilePaneProps>>()
  const [loading,setLoading] = useState(true)

  const [searchByFilename,setSearchByFilename] = useState("")
  const [searchByCaption,setSearchByCaption] = useState("")

  const fileNameSearcher = new FuzzySearch(FileArrayAll!,['fileName'],{sort:true})
  const captionSearcher = new FuzzySearch(FileArrayAll!,['caption'],{sort:true})

  return (
    <div className='receivedFiles w-full flex justify-center items-center'>
        <div className="bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl flex justify-center text-5xl md:text-7xl">
        <div className='flex flex-col content py-4 px-4 w-full h-full items-center'>
          <div className='w-fit h-fit'>Files Sent</div>
          <div className='w-full h-100px grid grid-cols-5 gap-5'>
          <input className='flex h-[100px] col-span-3 text-5xl px-2 py-2 my-4 justify-start items-center bg-slate-300 dark:bg-slate-800 rounded-3xl' placeholder='🔍 Search by filename' disabled={searchByCaption?true:false}
          value={searchByFilename} onChange={(e) => {
            setSearchByFilename(e.target.value)
            if (!e.target.value) setFileArray(FileArrayAll)
            setFileArray(fileNameSearcher.search(e.target.value)) 
          }}
          ></input>
          <input className='flex h-[100px] col-span-2 text-5xl px-2 py-2 my-4 justify-start items-center bg-slate-300 dark:bg-slate-800 rounded-3xl' placeholder='Search by caption' disabled={searchByFilename?true:false}
          value={searchByCaption} onChange={(e) => {
            setSearchByCaption(e.target.value)
            if (!e.target.value) setFileArray(FileArrayAll)
            setFileArray(captionSearcher.search(e.target.value)) 
          }}
          ></input>
          </div>
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
