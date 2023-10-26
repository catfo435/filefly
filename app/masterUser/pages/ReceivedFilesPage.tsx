"use client"
import React, { useEffect, useState } from 'react'

import {ref, listAll, getMetadata } from "firebase/storage";
import { fileStorage } from '@/app/backend/fireBase';
import { supabase } from '@/app/backend/supabase';
import FilePane, {FilePaneProps} from '../masterComponents/FilePane';


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

      let fileProps : FilePaneProps = {
        user : metaData.customMetadata!.sentBy,
        caption: metaData.customMetadata!.caption,
        time: metaData.customMetadata!.timeStamp,
        fileName : res.items[i].name,
        downloadFilePath : res.items[i].fullPath
      }
      fileArray.push(fileProps)
    }
    setFileArray(fileArray)
    setLoading(false)
  }).catch(console.error);

  },[])

  const [FileArray,setFileArray] = useState<Array<any>>()
  const [loading,setLoading] = useState(true)


  return (
    <div className='receivedFiles w-full flex justify-center items-center'>
        <div className="bg-[#D6DEE8] dark:bg-[#162032] w-[90%] h-[90%] rounded-3xl flex justify-center text-5xl md:text-7xl">
        <div className='flex flex-col content py-4 px-4 w-full h-full items-center'>
          <div className='w-fit h-fit'>Files received</div>
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
