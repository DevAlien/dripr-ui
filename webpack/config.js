import path from 'path';
import webpack from 'webpack';
import merge from 'lodash/object/merge';
import fs from 'graceful-fs';
import config from '../config';

const commonConfig = {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),
    new webpack.DefinePlugin({
      GA_TRACKING_CODE: JSON.stringify('UA-63854870-1')
    })
  ],
  progress: true
};

export const client = merge({}, commonConfig, {
  entry: {
    main: [
      './src/client'
    ],
    vendor: [
      'react',
      'react-router',
      'immutable'
    ]
  },
  output: {
    path: path.join(__dirname, '../public/build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/build/'
  },
  plugins: commonConfig.plugins.concat([
    new webpack.DefinePlugin({
      'typeof window': JSON.stringify('object')
    })
  ])
});

export const server = merge({}, commonConfig, {
  entry: {
    main: [
      './src/server'
    ]
  },
  target: 'node',
  output: {
    library: true,
    libraryTarget: 'commonjs2',
    pathinfo: true,
    path: path.join(__dirname, '../server/build'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/build/'
  },
  externals: fs.readdirSync(path.join(__dirname, '../node_modules'))
    .map(key => new RegExp(`^${key}`))
});
