import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function useSetPathQuery(label: string, value: string) {
    const router = useRouter()
    const pathname = usePathname()
    const query = `${label}=${value}`
    useEffect(() => {
        router.push(pathname + '?' + query)
    }, [])
    return query
}