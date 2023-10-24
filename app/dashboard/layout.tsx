"use client"
import { useEffect, useState } from "react"
import UserMenu from "../components/UserMenu"
import { usePathname, useRouter } from "next/navigation"

export default function DashLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [auth, setAuth] = useState(false)
    const router = useRouter()

    const selectedUser = sessionStorage.getItem("set_user")

    useEffect(() => {
      let user;
      if (typeof window !== "undefined" && window.localStorage){
        user = localStorage.getItem("user")!
        if (!user) {
          router.replace("/")
          return
        }
      }
      if (!selectedUser){
        const path = window.location.href
        if (path.match("\/(?:.(?!\/))+$")![0] != "/dashboard")
        window.location.href = "/dashboard"
      }
      setAuth(true);
      (document.getElementsByClassName("dashMenu")[0] as HTMLElement).hidden = false 
    },[])

    return auth && (
      <div className="flex w-full h-full">
        <UserMenu />
        <div className="dashboardContent flex w-full h-full">
          {children}
        </div>  
      </div>
    )
  }