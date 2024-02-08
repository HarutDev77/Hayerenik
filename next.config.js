/** @type {import('next').NextConfig} */
const nextConfig = {
    // webpack(config) {
    //     config.module.rules.push({
    //         test: /\.svg$/i,
    //         issuer: /\.[jt]sx?$/,
    //         use: ['@svgr/webpack'],
    //     })
    //
    //     return config
    // },
    i18n: {
        locales: ['en', 'am'],
        defaultLocale: 'en',
    },
}

module.exports = nextConfig
