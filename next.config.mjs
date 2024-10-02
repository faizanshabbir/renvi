/** @type {import('next').NextConfig} */
const nextConfig = {  
  reactStrictMode: true,
  // Add this line:
  experimental: { serverActions: true },
  env: {
    REPLICATE_API_TOKEN: process.env.REPLICATE_API_TOKEN,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY,
    SUPABASE_PUBLIC_KEY: process.env.SUPABASE_PUBLIC_KEY
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "*.replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co", // Add this line for Supabase storage
      }
    ]
  },
}

export default nextConfig
