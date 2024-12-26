/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // 添加对 canvas 的支持
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        canvas: false,
      };
    }

    return config;
  },
  // 添加对外部包的转译支持
  transpilePackages: ['html2canvas', 'jspdf'],
};

module.exports = nextConfig; 