"use client"

import { useUserStore } from "@/app/_store/useUserStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Page(){
    const {clearSession} = useUserStore()
    const router = useRouter()
    
    useEffect(() => {
        clearSession()
        router.replace('/')
    }, [])

    return <></>
}