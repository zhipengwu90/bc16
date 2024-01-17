/** @type {import('next').NextConfig} */
const nextConfig = {
  serverMinification: false,
  
};

module.exports = nextConfig;

module.exports = {


  env: {
    NEXT_PUBLIC_SAS_URL: process.env.NEXT_PUBLIC_SAS_URL,
  },
};
