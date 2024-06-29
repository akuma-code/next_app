import { useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function useQuerySearch(queryString?: string) {
    const searchParams = useSearchParams()
    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(queryString ?? searchParams.toString())
        params.set(name, value)

        return params.toString()
    },
        [queryString, searchParams]
    )

    return createQueryString
}