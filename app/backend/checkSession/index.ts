import { supabase } from "../supabase"

export async function checkUser(){

    const sessionCheck = await supabase
    .from("loginHistory")
    .select()
    .eq("secret",sessionStorage.getItem("sessionSecret")!)
    .eq("master_user",sessionStorage.getItem("user")!)


    if (sessionCheck.data![0] == null){
      alert("Invalid Authentication!")
      sessionStorage.clear()
      document.removeEventListener("click",checkUser)
      window.location.href = "/"
      return;
    }
}