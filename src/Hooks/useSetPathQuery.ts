import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function useSetPathQuery(label: string, value: string) {
    const query = `${label}=${value}`
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        router.push(pathname + '?' + query)
    }, [pathname, query, router])
    return query
}