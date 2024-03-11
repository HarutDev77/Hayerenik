/** @type {import('next').NextConfig} */
const nextConfig = {
   // transpilePackages: [
   //    'rc-util',
   //    '@ant-design',
   //    'kitchen-flow-editor',
   //    '@ant-design/pro-editor',
   //    'zustand',
   //    'leva',
   //    'antd',
   //    'rc-pagination',
   //    'rc-picker',
   // ],
   // webpack(config) {
   //     config.module.rules.push({
   //         test: /\.svg$/i,
   //         issuer: /\.[jt]sx?$/,
   //         use: ['@svgr/webpack'],
   //     })
   //
   //     return config
   // },
   typescript: {
      ignoreBuildErrors: true,
   },
   eslint: {
      ignoreDuringBuilds: true,
   },
   i18n: {
      locales: ['en', 'am'],
      defaultLocale: 'en',
   },
   images: {
      remotePatterns: [
         {
            protocol: 'http',
            hostname: 'localhost',
            port: '8000',
         },
      ],
   },
};

module.exports = nextConfig;
