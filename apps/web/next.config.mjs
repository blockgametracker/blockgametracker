/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    transpilePackages: ["@repo/gateway"],
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "assets.blockgametracker.gg",
                port: "",
                pathname: "/icons/**",
            },
            {
                protocol: "https",
                hostname: "ds-api.blockgametracker.gg",
                port: "",
                pathname: "/servers/**",
            },
        ],
    },
}

export default nextConfig
