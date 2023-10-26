"use client"
import { supabase } from '@/app/backend/supabase'
import React, { useEffect, useState } from 'react'

export default function BlockedUsersPage() {

    async function handleUnblock(user :string){

        setLoading(true);

        let temp = blockedUsers ?? []
        temp.splice(temp.indexOf(user),1)


        try {
        await supabase
        .from("users")
        .update({blockedUsers:{users:temp}})
        .eq("userName",sessionStorage.getItem("user")!)

        setLoading(false)
        setblockedUsers(temp)
        alert("Unblocked!")
        
        }
        catch(e){
            setLoading(false)
            alert("Error!")
            console.error(e);
        }

    }

    async function handleBlockUser(){

        setLoading(true);
        

        if (blockedUsers?.includes(blockUser)){
            alert("User already blocked")
            setLoading(false)
            return;
        }

        let temp = blockedUsers ?? []
        temp.push(blockUser!)


        try {
        await supabase
        .from("users")
        .update({blockedUsers:{users:temp}})
        .eq("userName",sessionStorage.getItem("user")!)

        setLoading(false)
        setblockedUsers(temp)
        alert("Blocked!")
        
        }
        catch(e){
            setLoading(false)
            alert("Error!")
            console.error(e);
        }

    }

    async function fetchBlockedUsers(){
        const blockedUsersRef = await supabase
        .from("users")
        .select()
        .eq("userName",sessionStorage.getItem("user")!)

        if (blockedUsersRef.data![0].blockedUsers == null){
            setblockedUsers([])
            setLoading(false)
            return;
        }

        setblockedUsers(blockedUsersRef.data![0].blockedUsers.users)
        setLoading(false)
    }

    useEffect(() => {
        fetchBlockedUsers()
    },[])

    const [blockedUsers, setblockedUsers] = useState<Array<string>>()
    const [blockUser,setBlockUser] = useState<string>("")
    const [loading, setLoading] = useState(true)

  return (
    <div className='flex w-full h-full justify-center items-center'>
        <div className='w-2/3 h-[600px] px-5 py-5 bg-slate-300 dark:bg-slate-700 rounded-3xl flex flex-col items-center'>
            <div className='text-3xl flex justify-center'>Blocked Users</div>
            <div className='flex flex-col overflow-scroll w-1/2 h-[400px] bg-slate-400 dark:bg-slate-600 my-5 rounded-3xl text-3xl'>
                {loading?<div className='flex justify-center items-center w-full h-full'>Loading...</div>:blockedUsers?.map((user,id) => {return <div key={id} className='w-1/2 mx-auto rounded-lg h-16 my-5 px-5 py-5 bg-slate-500 flex justify-center items-center hover:opacity-90 hover:cursor-pointer'
                onClick={() => {handleUnblock(user)}}
                >{id+1} . {user}</div>})}
            </div>
            <div className='flex w-1/2'>
                <input className='w-1/2 h-20 my-5 px-5 py-5 text-3xl flex justify-center items-center rounded-xl bg-slate-400 dark:bg-slate-600 mr-2' placeholder='Block User'
                value={blockUser} onChange={(e) => {setBlockUser(e.target.value.trim())}}
                ></input>
                <div className='w-1/2 h-20 my-5 px-5 py-5 text-3xl flex justify-center items-center rounded-xl bg-slate-500 dark:bg-slate-500 ml-2 hover:cursor-pointer hover:opacity-80'
                onClick={handleBlockUser}
                >Block</div>
            </div>
        </div>
    </div>
  )
}
