"use client"

import React from 'react'

type FileProps = {
  fileDetails : File,
  setPreviewState : Function
}

export default function FileDetailsPane(props: FileProps) {
  
  return (
    <div className='grid grid-cols-2 text-3xl w-full h-full text-center'>
      <div className='col-span-2 text-4xl overflow-x-scroll'>{props.fileDetails.name}</div>
      <div>Size: {props.fileDetails.size/1000}K</div>
      <div>Type: {props.fileDetails.type}</div>
      {(props.fileDetails.type == "application/pdf" || props.fileDetails.type.match("^(image\/)"))?<div className='bg-slate-350 h-20 col-span-2 mx-10 dark:bg-slate-700 hover:opacity-90 hover:dark:bg-slate-650 px-3 py-3 hover:cursor-pointer rounded-3xl' onClick={() => {
        props.setPreviewState(props.fileDetails.type == "application/pdf"?"pdf":"img");
      }}>{props.fileDetails.type == "application/pdf"?"Preview PDF":"Preview Image"}</div>:""}
    </div>
  )
}
