/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BIGCOMMERCE_ACCESS_TOKEN: process.env.BIGCOMMERCE_ACCESS_TOKEN || '',
    BIGCOMMERCE_STORE_HASH: process.env.BIGCOMMERCE_STORE_HASH || '',
  },
}

export default nextConfig
