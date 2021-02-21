const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  assetPrefix: isProd ? 'https://out.instatus.com/out' : '',
  basePath: isProd ? '/out' : '',
  async redirects() {
    return [
      {
        source: '/download/mac',
        destination: 'https://github.com/instatushq/out/suites/2089374860/artifacts/42365290',
        permanent: false,
      },
      {
        source: '/download/windows',
        destination: 'https://github.com/instatushq/out/suites/2089264035/artifacts/42362216',
        permanent: false,
      },
      {
        source: '/download/linux',
        destination: 'https://github.com/instatushq/out/suites/2089264035/artifacts/42362214',
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
