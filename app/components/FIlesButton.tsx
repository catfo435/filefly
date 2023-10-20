import { useRouter } from "next/navigation"

export default function FilesButton(){

    const router = useRouter()
    return (
        <div className="h-full w-full flex flex-col md:flex-row items-center">
            <div className="h-full w-3/4 md:w-1/2 flex justify-center items-center hover:cursor-pointer">
                <div className="bg-slate-300 dark:bg-slate-700 hover:bg-slate-350 hover:dark:bg-slate-650 w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-5xl md:text-7xl"
                    onClick={() => {router.push("/dashboard/sendMenu")}}>
                    <span>Send</span>
                </div>
            </div>
            <div className="h-full w-3/4 md:w-1/2 flex justify-center items-center hover:cursor-pointer">
                <div className="bg-slate-300 dark:bg-slate-700 hover:bg-slate-350 hover:dark:bg-slate-650 w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-5xl md:text-7xl"
                    onClick={() => {router.push("/dashboard/receiveMenu")}}>
                    <span>Recieve</span>
                </div>
            </div>
        </div>
        

    )
}