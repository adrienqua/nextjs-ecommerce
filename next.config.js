/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client"],
        serverActions: true,
    },
}

module.exports = nextConfig
