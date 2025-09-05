// webpack.prod.config.mjs
import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import dotenv from 'dotenv';

dotenv.config({ path: './client/.env' });

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Use both REACT_APP_ and non-REACT_APP_ env variable names for compatibility
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID || '';
const SPOONACULAR_API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY || process.env.SPOONACULAR_API_KEY || '';

export default {
  mode: 'production',
  entry: './client/src/index.jsx',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'client', 'dist'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_APP_GOOGLE_CLIENT_ID': JSON.stringify(GOOGLE_CLIENT_ID),
      'process.env.GOOGLE_CLIENT_ID': JSON.stringify(GOOGLE_CLIENT_ID),
      'process.env.REACT_APP_SPOONACULAR_API_KEY': JSON.stringify(SPOONACULAR_API_KEY),
      'process.env.SPOONACULAR_API_KEY': JSON.stringify(SPOONACULAR_API_KEY)
    }),
    new HtmlWebpackPlugin({
      template: './client/src/index.html',
      filename: 'index.html',
      favicon: './client/src/favicon.ico',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'], 
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
};
