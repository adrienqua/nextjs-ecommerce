/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client", "bcrypt"],
        serverActions: true,
    },
    source: "/api/:path*",
}

module.exports = nextConfig
