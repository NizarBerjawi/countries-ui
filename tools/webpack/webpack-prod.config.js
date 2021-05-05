/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack-common.config.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          filename: 'js/[name].js',
          name: 'common',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },
  plugins: [],
});
