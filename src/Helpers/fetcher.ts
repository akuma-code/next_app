

export const fetcher = (resource: string, init?: RequestInit | undefined) => fetch(resource, init).then(res => res.json())

export async function fetcherJson<JSON = any>(
    input: RequestInfo,
    init?: RequestInit,
): Promise<JSON> {
    const res = await fetch(input, init);

    if (!res.ok) {
        const json = await res.json();
        if (json.error) {
            const error = new Error(json.error) as Error & {
                status: number;
            };
            error.status = res.status;
            throw error;
        } else {
            throw new Error("An unexpected error occurred");
        }
    }

    return res.json();
}