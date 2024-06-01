/** @type {import('next').NextConfig} */

// import { headers } from 'next/headers'; 

const securityHeaders = [
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'X-Frame-Options', value: 'DENY' },
    { key: 'X-XSS-Protection', value: '1; mode=block' },
    { key: 'Cross-Origin-Resource-Policy', value: 'same-site' },
    {
        key: 'Cross-Origin-Opener-Policy',
        value: 'same-origin-allow-popups'
    },
    { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
    { key: 'Referrer-Policy', value: 'no-referrer' },
    {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains'
    },
    // { key: 'Expect-CT', value: 'enforce, max-age=86400' },
    {
        key: 'Content-Security-Policy',
        value: `object-src 'none'; frame-ancestors 'self'; block-all-mixed-content; upgrade-insecure-requests`
    },
    {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), payment=()'
    },
    {
        key: 'Origin',
        value: 'localhost'
    }
]
const nextConfig = {
    reactStrictMode: true,
    // output: 'export',
    distDir: 'output',
    async redirects() {
        return [
            {
                source: '/',
                destination: '/avangard/events',
                permanent: true
            }
        ]
    }

};

export default nextConfig;
