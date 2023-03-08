const NextFederationPlugin = require('@module-federation/nextjs-mf')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, options) {
    const { webpack } = options;
    Object.assign(config.experiments, { topLevelAwait: true });
    if (!options.isServer) {
      //config.cache=false
      config.plugins.push(
        new NextFederationPlugin({
          name: 'checkout',
          remotes: {
            remote: 'remote@http://localhost:8081/remote.js',
          },
          filename: 'static/chunks/remoteEntry.js',
          exposes: {},
          shared: {},
        }),
      );
    }
    return config;
  }
}

module.exports = nextConfig