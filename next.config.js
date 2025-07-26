/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    basePath: "/infotecs-test",
    reactStrictMode: true,
    images:{
        unoptimized:true,
    }
}

module.exports = nextConfig
