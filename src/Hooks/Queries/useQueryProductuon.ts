import { fetcher } from "@/Helpers/fetcher";
import { useQuery } from "@tanstack/react-query";

export function useQueryProduction() {
    const query = useQuery({
        queryKey: [url],
        queryFn: fetch_prodApi,
    })

    return query
}

const url = `https://akumadev-git-auth-akuma-codes-projects.vercel.app/api/backup?data=all`
const fetch_prodApi = async () => fetch(url, {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    mode: 'no-cors'

})