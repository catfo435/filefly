import React from 'react'

type PreviewProps = {
    previewType : "pdf" | "img"
    fileDetails : File
    setPreviewState : Function
}

export default function PreviewPane(props: PreviewProps) {
  return (
    <div className='previewContent relative py-4 px-4 w-full h-full flex flex-col items-center shrink-0'>
      <div className='absolute right-10 top-5 hover:cursor-pointer bg-slate-350 dark:bg-slate-700 hover:opacity-90 px-5 py-5 rounded-3xl' onClick={
        () => {
          props.setPreviewState(null)
        }
      }>Close</div>
      <span className='text-4xl my-5'>Preview : {props.fileDetails.name}</span>
      <iframe src={window.URL.createObjectURL(props.fileDetails)}
   width="600" height="600" title={props.fileDetails.name}></iframe>
    </div>
  )
}
