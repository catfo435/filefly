export default function FilesButton(){
    return (
        <div className="h-full w-full flex">
            <div className="h-full w-1/2 flex justify-center items-center hover:cursor-pointer">
                <div className="bg-slate-300 dark:bg-slate-700 w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-7xl">
                    <span>Send</span>
                </div>
            </div>
            <div className="h-full w-1/2 flex justify-center items-center hover:cursor-pointer  ">
                <div className="bg-slate-300 dark:bg-slate-700 w-[90%] h-[90%] rounded-3xl flex justify-center items-center text-7xl">
                    <span>Recieve</span>
                </div>
            </div>
        </div>

    )
}