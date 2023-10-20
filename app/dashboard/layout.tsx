"use client"
import { useEffect, useState } from "react"
import UserMenu from "../components/UserMenu"
import { useRouter } from "next/navigation"


export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [auth, setAuth] = useState(false)
    const router = useRouter()

    useEffect(() => {
      let user = "NaN"
      if (typeof window !== "undefined" && window.localStorage){
        user = localStorage.getItem("user")!
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
        {children}
      </div>
    )
  }