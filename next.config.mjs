/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'd2lnr5mha7bycj.cloudfront.net',
                port: '', // Leave empty for default
                pathname: '/**', // Matches all paths
            },
        ],
    },
};

export default nextConfig;
