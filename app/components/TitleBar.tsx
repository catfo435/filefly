"use client"
import { useTheme } from "next-themes";

export default function TitleBar(){

    const { theme, setTheme } = useTheme();

    return (
        <div className="flex-initial h-20 w-screen bg-slate-400 dark:bg-slate-700 flex justify-center items-center">
            <div className='dashMenu absolute left-5' hidden onClick={() => {
                const userMenu = (document.getElementsByClassName("userMenu")[0] as HTMLElement);
                const overlay = (document.getElementsByClassName("clickDisableOverlay")[0] as HTMLElement);
                const content = (document.getElementsByClassName("dashboardContent")[0] as HTMLElement);
                content.classList.add("pointer-events-none");
                overlay.classList.add("active");
                userMenu.classList.add("active");
            }}>
                <div className="w-fit h-fit hover:cursor-pointer">
                    <div className='hamburgerIcon w-10 h-2 bg-slate-700 dark:bg-slate-300 rounded-3xl mb-1'></div>
                    <div className='hamburgerIcon w-10 h-2 bg-slate-700 dark:bg-slate-300 rounded-3xl mb-1'></div>
                    <div className='hamburgerIcon w-10 h-2 bg-slate-700 dark:bg-slate-300 rounded-3xl'></div>
                </div>
            </div>
            <div className="hover:cursor-pointer">
                <a href="/dashboard">
                <span className="titleBarText">F</span>
                <span className="titleBarText">I</span>
                <span className="titleBarText">L</span>
                <span className="titleBarText">E</span>
                <span className="titleBarText">F</span>
                <span className="titleBarText">L</span>
                <span className="titleBarText">Y</span>
                </a>
            </div>
            <button className="absolute right-5 h-8 w-8 rounded-lg hover:outline-double bg-slate-700 dark:bg-slate-300" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}></button>
        </div>
    )
}