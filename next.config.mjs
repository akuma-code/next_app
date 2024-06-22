/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    // output: 'export',
    distDir: 'output',
    experimental: {
        serverComponentsExternalPackages: [
            '@casl/ability',
            '@casl/prisma',
        ]
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/avangard/events',
                permanent: true
            }
        ]
    },
    // staticPageGenerationTimeout: 60

};

export default nextConfig;
