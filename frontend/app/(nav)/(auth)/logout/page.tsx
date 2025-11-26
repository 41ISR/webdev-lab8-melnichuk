"use client"

import { useUserStore } from "@/app/_store/useUserStore"
import { useRouter } from "next/navigation"

export default function Page(){
    const {clearSession} = useUserStore()
    const router = useRouter()
    clearSession()
    router.replace('/')

    return <></>
}