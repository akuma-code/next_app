'use client'

import { getMasters } from "@/Services/masterService"
import { useEffect, useState } from "react"
import { useToggle } from "../useToggle"

export function useMasters(id?: number) {
    const [masters, setMasters] = useState([] as { id: number, name: string }[])
    const [name, setName] = useState<string | undefined>("")
    const [isLoading, loading] = useToggle(false)
    useEffect(() => {
        async function m() {
            return await getMasters()
        }
        loading.on
        m()
            .then(res => setMasters(res))
            .finally(loading.off)
    }, [loading.off, loading.on])
    if (id) {
        const masterName = masters.find(m => m.id === id)?.name
        setName(masterName)
    }
    return { masters, isLoading, masterName: name }
}