const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? 'https://out.instatus.com/out' : '',
  basePath: isProd ? '/out' : '',
  async redirects() {
    return [
      {
        source: '/download/mac',
        destination: 'https://github.com/instatushq/out/releases/download/v1.0.8/Instatus.Out-1.0.8-mac.dmg',
        permanent: false,
      },
      {
        source: '/download/windows',
        destination: 'https://github.com/instatushq/out/releases/download/v1.0.8/Instatus-Out-Setup-1.0.8.exe',
        permanent: false,
      },
      {
        source: '/download/linux',
        destination: 'https://github.com/instatushq/out/suites/2233867575/artifacts/46316744',
        permanent: false,
      },
      {
        source: '/video',
        destination: 'https://youtu.be/DJZ9YgMYBno',
        permanent: false,
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};
