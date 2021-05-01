/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack-common.config.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: [path.join(process.cwd(), 'src/index')],
  output: {
    filename: '[name].js',
  },
  optimization: {
    minimize: true,
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: 'all',
          filename: 'common/[name].js',
          name: 'common',
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  },

  plugins: [],
});
