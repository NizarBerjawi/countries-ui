/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const commonConfig = require('./webpack-common.config.js');

module.exports = merge(commonConfig, {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  optimization: {
    minimize: false,
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
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: 3000,
    host: '0.0.0.0',
    historyApiFallback: true,
  },
});
