/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin } = require('webpack');
const commonConfig = require('./webpack-common.config.js');

module.exports = merge(commonConfig, {
  mode: 'development',

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  // Here the application starts executing and webpack starts bundling
  entry: [path.join(process.cwd(), 'src/index')],

  // Options related to how webpack emits results
  output: {
    // The filename template for entry chunks
    filename: '[name].js',
  },
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
    contentBase: path.join(__dirname, './dist'),
    compress: true,
    port: 3000,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: true,
  },

  plugins: [new HotModuleReplacementPlugin()],
});
