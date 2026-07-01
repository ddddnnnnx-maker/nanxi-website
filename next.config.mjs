/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // serve modern formats (much smaller than PNG/JPG) and resize per device
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
