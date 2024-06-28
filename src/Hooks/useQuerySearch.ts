import { useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function useQuerySearch(name: string, value: string) {
    const searchParams = useSearchParams()
    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)

        return params.toString()
    },
        [searchParams]
    )

    return createQueryString(name, value)
}