import jwt_decode from "jwt-decode"
import { supabase } from "../supabase"

export async function checkUser(){

    const sessionCheck = await supabase
    .from("loginHistory")
    .select()
    .eq("secret",sessionStorage.getItem("sessionSecret")!)

    if (sessionCheck.data![0] == null){
      return;
    }

    if (sessionCheck.data != null && !((jwt_decode(sessionCheck.data[0].loginSessionToken) as any).userName == sessionStorage.getItem("user")!)){
      alert("Invalid Authentication!")
      sessionStorage.clear()
      document.removeEventListener("click",checkUser)
      window.location.href = "/"
    }
}