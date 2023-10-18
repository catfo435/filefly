export default function FilesButton(){
    return (
        <div className="h-full w-full flex flex-col md:flex-row items-center">
            <div className="h-full w-3/4 md:w-1/2 flex justify-center items-center hover:cursor-pointer">
                <div className="bg-slate-300 dark:bg-slate-700 w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-5xl md:text-7xl">
                    <span>Send</span>
                </div>
            </div>
            <div className="h-full w-3/4 md:w-1/2 flex justify-center items-center hover:cursor-pointer">
                <div className="bg-slate-300 dark:bg-slate-700 w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-5xl md:text-7xl">
                    <span>Recieve</span>
                </div>
            </div>
        </div>

    )
}