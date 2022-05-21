/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const env = require('dotenv').config().parsed;

module.exports = {
  entry: [path.join(process.cwd(), 'src/index')],
  output: {
    filename: path.join('js', '[name].js'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: path.join('css', '[name].css'),
    }),
    new HtmlWebpackPlugin({
      title: 'Places UI',
      inject: 'body',
      template: './src/index.html',
    }),
    new webpack.EnvironmentPlugin(env),
  ],
};
