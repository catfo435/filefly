"use client"
import { useTheme } from "next-themes";

export default function TitleBar(){

    const { theme, setTheme } = useTheme();

    return (
        <div className="h-20 w-screen bg-slate-400 dark:bg-slate-700 flex justify-center items-center">
            <span className="titleBarText">F</span>
            <span className="titleBarText">I</span>
            <span className="titleBarText">L</span>
            <span className="titleBarText">E</span>
            <span className="titleBarText">F</span>
            <span className="titleBarText">L</span>
            <span className="titleBarText">Y</span>
            <button className="absolute right-5 h-10 w-10 rounded-lg hover:outline-double bg-slate-700 dark:bg-slate-300" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}></button>
        </div>
    )
}