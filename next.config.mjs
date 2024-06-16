/** @type {import('next').NextConfig} */

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
    },
    staticPageGenerationTimeout: 60

};

export default nextConfig;
