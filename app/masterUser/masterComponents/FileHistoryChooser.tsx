export default function FileHistoryChooser(){

    return (
        <div className="h-full w-full flex flex-col md:flex-row items-center">
            <div className="h-3/4 w-3/4 md:w-1/2 flex justify-center items-center hover:cursor-pointer">
                <a href={"/dashboard/actionChooser/sendMenu"}>
                <div className="bg-slate-300 dark:bg-slate-700 hover:bg-slate-350 hover:dark:bg-slate-650 w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-5xl md:text-7xl">
                    <span>View Sent Files</span>
                </div>
                </a>
            </div>
            <div className="h-3/4 w-3/4 md:w-1/2 flex justify-center items-center hover:cursor-pointer">
                <a href="/dashboard/actionChooser/receiveMenu">
                <div className="bg-slate-300 dark:bg-slate-700 hover:bg-slate-350 hover:dark:bg-slate-650 w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-5xl md:text-7xl">
                    <span>View Received Files</span>
                </div>
                </a>
            </div>
        </div>
        

    )
}