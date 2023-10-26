"use client"
import { useTheme } from "next-themes";

export default function TitleBar(){

    const { theme, setTheme } = useTheme();

    return (
        <div className="flex-initial shrink-0 h-20 w-screen bg-slate-400 dark:bg-slate-700 flex justify-center items-center">
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