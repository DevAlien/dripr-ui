import merge from 'lodash/object/merge';
import webpack from 'webpack';
import fs from 'graceful-fs';
import path from 'path';
import * as config from './config';
import writeStats from './utils/write-stats';
import notifyStats from './utils/notify-stats';

const babelrc = JSON.parse(fs.readFileSync(path.join(__dirname, '../.babelrc'), 'utf8'));
if (config.client.devtools) {
  console.log("Dev tools are ENABLED");
}

export const client = merge({}, config.client, {
  devtool: 'eval',
  entry: {
    main: [
      'webpack-hot-middleware/client'
    ].concat(config.client.entry.main)
  },
  module: {
    loaders: config.client.module.loaders.concat([
      {
        test: /\.jsx?$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: merge({}, babelrc, {
          plugins: [
            'react-transform'
          ],
          extra: {
            'react-transform': {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                },
                {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }
              ]
            }
          }
        })
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }
    ])
  },
  plugins: config.client.plugins.concat([
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
         __CLIENT__: true,
         __SERVER__: false,
         __DEVELOPMENT__: true,
         __DEVTOOLS__: config.client.devtools, // <-------- ENABLE redux-devtools HERE
         __CONFIG__: config
       }),
    // optimize
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),

    // stats
    function() {
      this.plugin('done', writeStats);
      this.plugin('done', notifyStats);
    }
  ])
});

export const server = merge({}, config.server, {
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
         __DEVELOPMENT__: true,
         __DEVTOOLS__: config.client.devtools, // <-------- ENABLE redux-devtools HERE
         __CONFIG__: config
       }),
    // optimize
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
});

export default [client, server];
