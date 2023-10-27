"use client"
import React, { useEffect, useState } from 'react'

import {ref, listAll, getMetadata } from "firebase/storage";
import { fileStorage } from '@/app/backend/fireBase';
import { supabase } from '@/app/backend/supabase';
import FilePane, {FilePaneProps} from '../masterComponents/FilePane';
import FuzzySearch from 'fuzzy-search';


export default function ReceivedFilesPage() {


  useEffect(() => {
    const listRef = ref(fileStorage, `${sessionStorage.getItem("user")}`);

  listAll(listRef)
  .then(async (res) => {
    let fileArray = new Array<FilePaneProps>()
    for (var i=0;i<res.items.length;i++){
      
      const fileRef = ref(fileStorage,res.items[i].fullPath)

      const metaData = await getMetadata(fileRef)

      const getBlockedUsers = await supabase
      .from("users")
      .select()
      .eq("userName",sessionStorage.getItem("user")!)

      if (getBlockedUsers.data![0].blockedUsers != null && getBlockedUsers.data![0].blockedUsers.users.includes(metaData.customMetadata!.sentBy)){
        continue;
      }
      const getVersion = await supabase
      .from("fileHistory")
      .select()
      .eq("sentTo",sessionStorage.getItem("user")!)
      .eq("master",metaData.customMetadata!.sentBy)
      .eq("fileName",res.items[i].name)
      .order("version",{ascending:false})      

      let fileProps : FilePaneProps = {
        user : metaData.customMetadata!.sentBy,
        caption: metaData.customMetadata!.caption,
        time: metaData.customMetadata!.timeStamp,
        fileName : res.items[i].name,
        downloadFilePath : res.items[i].fullPath,
        version : getVersion.data![0].version!
      }
      fileArray.push(fileProps)
    }
    setFileArray(fileArray)
    setFileArrayAll(fileArray)
    setLoading(false)
  }).catch(console.error);

  },[])

  const [FileArray,setFileArray] = useState<Array<FilePaneProps>>()
  const [FileArrayAll,setFileArrayAll] = useState<Array<FilePaneProps>>()
  const [loading,setLoading] = useState(true)

  const [searchByFilename,setSearchByFilename] = useState("")
  const [searchByCaption,setSearchByCaption] = useState("")

  const fileNameSearcher = new FuzzySearch(FileArrayAll!,['fileName'],{sort:true})
  const captionSearcher = new FuzzySearch(FileArrayAll!,['caption'],{sort:true})


  return (
    <div className='receivedFiles w-full flex justify-center items-center'>
        <div className="bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl flex justify-center text-5xl md:text-7xl">
        <div className='flex flex-col content py-4 px-4 w-full h-full items-center'>
          <div className='w-fit h-fit'>Files received</div>
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
            FileArray?.map((fileProps,id) => {return <FilePane key={id} {...fileProps} /> })
            }
          </div>
        </div>
        </div>
    </div>
  )
}
