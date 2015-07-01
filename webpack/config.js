import path from 'path';
import webpack from 'webpack';
import writeStats from './utils/write-stats';

const assetPath = path.join(__dirname, '../public/build');

let entry = {
  main: ['./src/client']
};

export default {
  entry: entry,
  output: {
    path: assetPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['eslint']
      }
    ],
    loaders: [
      {
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=[name]-[hash:8].[ext]'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=[name]-[hash:8].[ext]'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file?name=[name]-[hash:8].[ext]'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=[name]-[hash:8].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),

    function(){
      this.plugin('done', writeStats);
    }
  ],
  progress: true,
  stylus: {
    use: [
      require('nib')()
    ]
  },
  postcss: [
    require('autoprefixer-core')(),
    require('cssnano')()
  ]
};
