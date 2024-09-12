/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
  fetches: {
    fullUrl: true,
  }
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3002",
        pathname: "/api/assets/images/**",
      },
    ],
  },
};

export default nextConfig;
