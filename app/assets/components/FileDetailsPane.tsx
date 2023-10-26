"use client"

import React, { useEffect } from 'react'

type FileProps = {
  fileDetails : File
}

export default function FileDetailsPane(props: FileProps) {
  
  return (
    <div className='grid grid-cols-2 text-3xl w-full h-full text-center'>
      <div className='col-span-2 text-4xl overflow-x-scroll'>{props.fileDetails.name}</div>
      <div>Size: {props.fileDetails.size/1000}K</div>
      <div>Type: {props.fileDetails.type}</div>
    </div>
  )
}
