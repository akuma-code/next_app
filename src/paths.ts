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
}


export const paths = { pageUrl, apiUrl }