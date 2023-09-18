/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client"],
        serverActions: true,
    },
    source: "/api/:path*",
}

module.exports = nextConfig
