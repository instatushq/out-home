const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? 'https://out.instatus.com/out' : '',
  basePath: isProd ? '/out' : '',
  async redirects() {
    return [
      {
        source: '/download/mac',
        destination: 'https://github.com/instatushq/out/suites/2050715585/artifacts/42142305',
        permanent: false,
      },
      {
        source: '/download/windows',
        destination: 'https://github.com/instatushq/out/suites/2050715585/artifacts/42142306',
        permanent: false,
      },
      {
        source: '/download/linux',
        destination: 'https://github.com/instatushq/out/suites/2050715585/artifacts/42142304',
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
