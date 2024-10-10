/** @type {import('next').NextConfig} */
import ba from "@next/bundle-analyzer"

const withBundleAnalyzer = ba({
    enabled: process.env.ANALIZE === 'true',
})
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

export default withBundleAnalyzer(nextConfig);
