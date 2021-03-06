const webpack = require('webpack');

module.exports = {
  webpack: (config) => {
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty'
    };

    config.plugins.push(new webpack.DefinePlugin({
      'process.env.SERVER_ADDR': JSON.stringify(process.env.SERVER_ADDR),
    }));

    return config;
  },
  exportPathMap: function () {
    return {
      "/": { page: "/" },
    };
  },
  assetPrefix: './',
};
