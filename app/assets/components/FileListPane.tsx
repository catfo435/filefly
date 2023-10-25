"use client"

import React, { useEffect, useState } from 'react'


type fileListProps = {
  fileList: FileList
}

export default function FileListPane(props: fileListProps) {

  useEffect(() => {
    let fileNames = []
    for (var i=0;i<props.fileList.length;i++){
      fileNames.push(props.fileList.item(i)!.name)
    }
    setFileNames(fileNames)
  },[])

  const [fileNames,setFileNames] = useState<Array<string>>([])

  return (
    <div className='flex justify-center'>
      {fileNames.map((fileName) => {return <span className='flex justify-center my-2'>{fileName}</span>})}
    </div>
  )
}
