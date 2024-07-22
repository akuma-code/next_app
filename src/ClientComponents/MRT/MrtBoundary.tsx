'use client'

import { QueryClientProvider, HydrationBoundary, dehydrate, QueryClient, QueryFunction } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export const queryFetch: QueryFunction = async ({ queryKey }) => {
    const fetch_url = queryKey[0];
    if (typeof fetch_url !== "string") { return console.log("Fetch url must be string: ", fetch_url); }
    const data = await fetch(fetch_url, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return data.json();
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            queryFn: queryFetch,
            gcTime: 5000
        }
    }
})
export function MrtBoundary({ children }: { children: React.ReactNode }) {


    return (
        <QueryClientProvider client={ queryClient }>
            <HydrationBoundary state={ dehydrate(queryClient) }
            >
                { children }
                <ReactQueryDevtools
                    client={ queryClient }
                    initialIsOpen={ false }
                />
            </HydrationBoundary>
        </QueryClientProvider>
    )
}