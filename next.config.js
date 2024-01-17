/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@azure/storage-blob"],
  },
};

module.exports = nextConfig;

module.exports = {
  output: "standalone",

  env: {
    NEXT_PUBLIC_SAS_URL: process.env.NEXT_PUBLIC_SAS_URL,
  },

};
