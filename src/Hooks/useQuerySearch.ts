import { useSearchParams } from "next/navigation"
import { useCallback } from "react"

export function useQuerySearch() {
    const searchParams = useSearchParams()
    const createQueryString = useCallback((name: string, value: string | null) => {
        const currentSearch = searchParams.toString()
        if (!value) return currentSearch
        const params = new URLSearchParams(currentSearch)

        value ? params.set(name, value) : params.delete(name)


        return params.toString()
    },
        [searchParams]
    )

    return createQueryString
}