/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
  output: "standalone",

  env: {
    NEXT_PUBLIC_SAS_URL: process.env.NEXT_PUBLIC_SAS_URL,
  },

  serverMinification: false,
};
