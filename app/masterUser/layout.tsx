"use client"
import { useEffect } from "react"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {

    useEffect(() => {
      const masterUser = (sessionStorage.getItem("restrictedPrivy") == "disabled")

      if (!masterUser){
        window.location.href = "/dashboard"
      }
    },[])

    return (
      <div className="flex w-full h-full">
        <div className="absolute left-4 top-4 text-2xl hover:cursor-pointer hover:opacity-90 bg-slate-300 dark:bg-slate-500 px-2 py-2 rounded-lg" onClick={
          () => {
            sessionStorage.clear()
            window.location.href = "/"
          }
        }>Logout</div>
          {children}
      </div>
    )
  }