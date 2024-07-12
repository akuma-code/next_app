export const pageUrl = {
    root: '/' as const,
    stps: '/stp_data' as const,
    admin: '/admin' as const,
    users: '/view/users' as const,

    // root:'/' as const,
    // root:'/' as const,
}

export const apiUrl = {
    api: '/api' as const,
    db: '/api/db' as const,
    auth: '/api/auth' as const,
    register: '/api/auth/register' as const,
}

export const domains = [
    {
        href: "https://apps.akumads.online/",
        label: "apps server"

    },
    {
        href: "https://akumadev.ru/",
        label: "akumadev apps"
    }
]

export const paths = { pageUrl, apiUrl }