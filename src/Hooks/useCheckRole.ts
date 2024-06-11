'use client'



import { _log } from "@/Helpers/helpersFns"
import { UserRole } from "@prisma/client"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export function useCheckRole() {
    const [role, setRole] = useState<UserRole>("GUEST")
    const [isAuth, setAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { data, status, update } = useSession()




}

