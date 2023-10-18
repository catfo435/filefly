export default function LoginPane(){
    return (
        <div className="loginInPane shadow-black bg-slate-300 dark:bg-slate-700 w-2/3 min-[720px]:w-[480px] h-[614px] mt-20 rounded-2xl">
          <span className="my-16 flex justify-center items-center text-4xl font-bold">User Login</span>
          <div className="flex justify-center items-center">
          <form>
            <label htmlFor="login_user">Username</label>
            <input id="login_user" type="text"/>
            <br></br>
            <label htmlFor="login_user">Password</label>
            <input id="login_pass" type="password"/>

            <br></br>

            <div className="flex justify-center items-center">
            <button className="px-2 py-2 my-5 text-xl rounded-lg hover:outline-double bg-slate-400 dark:bg-slate-500" type="submit">Login</button>
            </div>
          </form>
          </div>
        </div> 
    );
}
