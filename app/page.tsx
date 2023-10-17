export default function Page() {
  return (
    <div className="relative h-screen w-screen flex justify-center items-center">
        <div className="loginInPane shadow-black bg-slate-300 w-1/3 h-2/3 rounded-2xl">
          <span className="my-16 flex justify-center items-center text-4xl font-bold">User Login</span>
          <div className="flex justify-center items-center">
          <form>
            <label htmlFor="login_user">Username</label>
            <input id="login_user" type="text"/>
            <br></br>
            <label htmlFor="login_user">Password</label>
            <input id="login_pass" type="password"/>
          </form>
          </div>
        </div>  
    </div>
  )
}