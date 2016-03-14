import merge from 'lodash/object/merge';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as config from './config';
import writeStats from './utils/write-stats';

export const client = merge({}, config.client, {
  devtool: 'source-map',
  output: {
    filename: '[name]-[hash:8].js',
    chunkFilename: '[name]-[chunkhash:8].js'
  },
  module: {
    loaders: config.client.module.loaders.concat([
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      }
    ])
  },
  plugins: config.client.plugins.concat([
    // extract css files
    new ExtractTextPlugin('[name]-[contenthash:8].css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
         __CLIENT__: true,
         __SERVER__: false,
         __DEVELOPMENT__: false,
         __DEVTOOLS__: false,
         __CONFIG__: config
       }),
    // optimize
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor-[hash:8].js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // stats
    function() {
      this.plugin('done', writeStats);
    }
  ])
});

export const server = merge({}, config.server, {
  devtool: 'source-map',
  module: {
    loaders: config.server.module.loaders.concat([
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'null'
      }
    ])
  },
  plugins: config.server.plugins.concat([
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
         __CLIENT__: false,
         __SERVER__: true,
         __DEVELOPMENT__: false,
         __DEVTOOLS__: false,
         __CONFIG__: config 
       }),
    // optimize
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
});

export default [client, server];
