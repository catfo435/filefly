"use client"
import { useEffect } from "react"

export default function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {

    useEffect(() => {
        const selectedUser = sessionStorage.getItem("set_user")

        if (!selectedUser){
          const path = window.location.href
          if (path.match("\/(?:.(?!\/))+$")![0] != "/dashboard")
          window.location.href = "/dashboard"
        }
    },[])

    return (
      <div className="flex w-full h-full">
          {children}
      </div>
    )
  }