import { useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function useQuerySearch(queryString?: string) {
    const searchParams = useSearchParams()
    const currentSearch = searchParams.toString()
    const createQueryString = useCallback((name: string, value: string) => {
        const params = new URLSearchParams(currentSearch)
        params.set(name, value)

        return params.toString()
    },
        [currentSearch]
    )

    return createQueryString
}