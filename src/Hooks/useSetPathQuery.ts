import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useMemo } from "react"

export function useSetPathQuery(label: string, value: string) {
    const query = `${label}=${value}`
    const router = useRouter()
    const pathname = usePathname()
    useEffect(() => {
        router.push(pathname + '?' + query)
    }, [pathname, query, router])
    return query
}

function Client(options: {
    name: string;
    value: string;
    items: string[];
}[]
) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const selectedOptions = useMemo<URLSearchParams>(() => {
        // Get the initial selected options from the URL's searchParams
        const params = new URLSearchParams(searchParams);

        // Preselect the first value of each option if its not
        // included in the current searchParams
        options.forEach((option) => {
            if (!searchParams.has(option.value)) {
                params.set(option.value, option.items[0]);
            }
        });

        return params;
    }, [searchParams, options]);

    const updateSearchParam = useCallback(
        (name: string, value: string) => {
            // Merge the current searchParams with the new param set
            const params = new URLSearchParams(searchParams);
            params.set(name, value);

            // Perform a new navigation to the updated URL. The current `page.js` will
            // receive a new `searchParams` prop with the updated values.
            router.push(pathname + '?' + params.toString()); // or router.replace()
        },
        [router, pathname, searchParams],



    )


    return [selectedOptions, updateSearchParam] as const

}