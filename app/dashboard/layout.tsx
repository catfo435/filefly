"use client"
import { useEffect, useState } from "react"
import UserMenu from "../assets/components/UserMenu"
import { usePathname, useRouter } from "next/navigation"

export default function DashLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [auth, setAuth] = useState(false)
    const router = useRouter()



    useEffect(() => {
      let user;
      if (typeof window !== "undefined" && window.sessionStorage){
        user = sessionStorage.getItem("user")!
        if (!user) {
          router.replace("/")
          return
        }
        
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