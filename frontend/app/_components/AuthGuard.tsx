"use client"

import { useRouter } from "next/navigation"
import { useUserStore } from "../_store/useUserStore"
import { useEffect } from "react"


export default function AuthGuard({children}:{children: any}){
    const {session} = useUserStore()
    const router = useRouter()

    useEffect(() => {
        if(!session.token) router.replace('/login')
    },[])

   if(!session.token) return <></>

   return children
}