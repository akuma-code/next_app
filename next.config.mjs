/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    // output: 'export',
    distDir: 'output',
    experimental: {
        serverComponentsExternalPackages: [
            // '@casl/ability',
            '@prisma/client',
        ]
    },

    async redirects() {
        return [
            {
                source: '/',
                destination: '/events',
                permanent: true
            }
        ]
    },
    staticPageGenerationTimeout: 60

}

export default nextConfig;
