"use client"
import { useEffect, useState } from "react"
import { checkUser } from "../backend/checkSession"

export default function DashLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const [auth, setAuth] = useState(false)


    useEffect(() => {

      const loggedIn = (sessionStorage.getItem("user") != null)

      // if (loggedIn){
      //   checkUser()
      //   document.addEventListener("click",checkUser)
      // }

      let user;
      if (typeof window !== "undefined" && window.sessionStorage){
        user = sessionStorage.getItem("user")!
        if (!user) {
          window.location.href = "/"
          return
        }
        const masterUser = (sessionStorage.getItem("restrictedPrivy") == "disabled")

        if (masterUser){
          window.location.href = "/masterUser"
          return;
        }
        
      }

      setAuth(true);
    },[])

    return auth && (
      <div className="flex w-full h-full">
        <div className="absolute left-4 top-4 text-2xl hover:cursor-pointer hover:opacity-90 bg-slate-300 dark:bg-slate-500 px-2 py-2 rounded-lg" onClick={
          () => {
            sessionStorage.clear()
            document.removeEventListener("click",checkUser)
            window.location.href = "/"
          }
        }>Logout</div>
        <div className="dashboardContent flex w-full h-full">
          {children}
        </div>  
      </div>
    )
  }