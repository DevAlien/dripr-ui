import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import path from 'path';
import config from './dev.config';

new WebpackDevServer(webpack(config), {
  contentBase: path.join(__dirname, '../public'),
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  quiet: true,
  stats: {
    colors: true
  },
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
}).listen(config.server.port, config.server.host, (err) => {
  if (err) throw err;
  console.log('webpack-dev-server listening at %s:%s', config.server.host, config.server.port);
});
