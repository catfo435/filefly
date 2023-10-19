"use client"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function TitleBar(){

    const { theme, setTheme } = useTheme();
    const router = useRouter()

    return (
        <div className="flex-initial h-20 w-screen bg-slate-400 dark:bg-slate-700 flex justify-center items-center">
            <div className='dashMenu absolute left-5' hidden onClick={() => {
                const userMenu = (document.getElementsByClassName("userMenu")[0] as HTMLElement);
                userMenu.style.width = "500px";
            }}>
                <div className='w-10 h-2 bg-slate-700 dark:bg-slate-300 rounded-3xl mb-1'></div>
                <div className='w-10 h-2 bg-slate-700 dark:bg-slate-300 rounded-3xl mb-1'></div>
                <div className='w-10 h-2 bg-slate-700 dark:bg-slate-300 rounded-3xl'></div>
            </div>
            <div className="hover:cursor-pointer" onClick={() => {router.replace("/dashboard")}}>
                <span className="titleBarText">F</span>
                <span className="titleBarText">I</span>
                <span className="titleBarText">L</span>
                <span className="titleBarText">E</span>
                <span className="titleBarText">F</span>
                <span className="titleBarText">L</span>
                <span className="titleBarText">Y</span>
            </div>
            <button className="absolute right-5 h-8 w-8 rounded-lg hover:outline-double bg-slate-700 dark:bg-slate-300" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}></button>
        </div>
    )
}